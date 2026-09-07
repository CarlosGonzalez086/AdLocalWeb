import React, { useEffect, useState } from "react";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const STORAGE_KEY = "adlocal_pwa_dismissed_at";
const DISMISS_COOLDOWN_DAYS = 5;

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if app is already running in standalone (PWA) mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (dismissedAt) {
      const daysPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysPassed < DISMISS_COOLDOWN_DAYS) {
        return;
      }
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    // Check if in Safari on iOS
    const isSafari =
      isIosDevice &&
      /safari/.test(userAgent) &&
      !/crios|fxios|optios|edgios/.test(userAgent);

    if (isIosDevice && isSafari) {
      setIsIos(true);
      // Wait a few seconds before showing to not disturb immediate browsing
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt (Android / Chrome / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show prompt after a slight delay
      setTimeout(() => {
        setIsVisible(true);
      }, 2500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(!showIosGuide);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setShowIosGuide(false);
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // Ignore localStorage errors
    }
  };

  if (!isVisible) return null;

  return (
    <div className="pwaBannerContainer" role="dialog" aria-label="Instalar ADLocal">
      <div className="pwaBannerCard">
        <div className="pwaBannerHeader">
          <img
            src="/icons/icon-192.png"
            alt="ADLocal App"
            className="pwaBannerAppIcon"
          />

          <div className="pwaBannerInfo">
            <div className="pwaBannerTitleRow">
              <span className="pwaBannerBadge">App Móvil</span>
              <h4 className="pwaBannerTitle">Lleva ADLocal en tu teléfono</h4>
            </div>
            <p className="pwaBannerSubtitle">
              Accede a comercios vecinos al instante sin abrir el navegador.
            </p>
          </div>

          <button
            type="button"
            className="pwaBannerCloseBtn"
            onClick={handleDismiss}
            aria-label="Cerrar aviso"
          >
            <MaterialSymbol icon="close" size="small" />
          </button>
        </div>

        {isIos && showIosGuide && (
          <div className="pwaIosGuideBox">
            <p className="pwaIosGuideText">
              1. Toca el botón <strong>Compartir</strong>{" "}
              <span className="pwaIosIcon">⎋</span> en la barra inferior de Safari.
            </p>
            <p className="pwaIosGuideText">
              2. Desliza hacia abajo y elige{" "}
              <strong>“Añadir a la pantalla de inicio” ⊞</strong>.
            </p>
          </div>
        )}

        <div className="pwaBannerActions">
          <button
            type="button"
            className="pwaBannerInstallBtn"
            onClick={handleInstallClick}
          >
            <MaterialSymbol
              icon={isIos ? "touch_app" : "download"}
              size="small"
              filled
            />
            <span>{isIos ? (showIosGuide ? "Ocultar guía" : "Cómo instalar") : "Instalar App"}</span>
          </button>

          <button
            type="button"
            className="pwaBannerLaterBtn"
            onClick={handleDismiss}
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;

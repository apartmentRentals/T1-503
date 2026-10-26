import { Viewer } from "@photo-sphere-viewer/core";
import { GalleryPlugin } from "@photo-sphere-viewer/gallery-plugin";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { nodosTour, textosVisor } from "./ambientes.js";

const nombreAmbiente = document.getElementById("nombre-ambiente");
const inicio = new URLSearchParams(window.location.search).get("inicio") || "sala-cocina";
const existe = nodosTour.some((nodo) => nodo.id === inicio);

const visor = new Viewer({
  container: "tour",
  loadingTxt: "Cargando recorrido…",
  canvasBackground: "#111",
  navbar: ["zoom", "move", "caption", "gallery", "gyroscope", "fullscreen"],
  lang: textosVisor,
  plugins: [
    GyroscopePlugin,
    GalleryPlugin.withConfig({
      visibleOnLoad: false,
      hideOnClick: true,
    }),
    VirtualTourPlugin.withConfig({
      dataMode: "client",
      positionMode: "manual",
      renderMode: "3d",
      startNodeId: existe ? inicio : "sala-cocina",
      preload: true,
      transitionOptions: {
        showLoader: true,
        speed: "20rpm",
        effect: "fade",
        rotation: true,
      },
      nodes: nodosTour,
    }),
  ],
});

const tour = visor.getPlugin(VirtualTourPlugin);

tour.addEventListener("node-changed", ({ node }) => {
  nombreAmbiente.textContent = node.name;
});

visor.addEventListener("ready", () => {
  const actual = tour.getCurrentNode();
  if (actual) {
    nombreAmbiente.textContent = actual.name;
  }
});

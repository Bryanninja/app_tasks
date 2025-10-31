// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Adicione ou ajuste esta seção
    watch: {
      usePolling: true, // Força o Vite a verificar ativamente as mudanças
    },
  },
});

---
title: "Optimización de Rendimiento: De 3 minutos a 2 segundos"
description: "Cómo identifiqué y solucioné un cuello de botella crítico en un motor de búsqueda de vacantes para un portal de RR.HH."
date: "2026-02-22"
---

## El Problema
Durante una sesión de pruebas con el equipo de QA, detectamos un comportamiento inaceptable: el módulo de búsqueda de ofertas laborales tomaba **casi 3 minutos** en cargar los resultados.

## Diagnóstico Técnico
Al "abrir el capó" del sistema, identifiqué tres fallas estructurales:

* **Carga Masiva:** Intento de recuperar el universo total de ofertas sin paginación.
* **Explosión de Datos:** Tabla de permisos con registros duplicados hasta 64 veces, rompiendo los *Joins*.
* **Payload Excesivo:** Envío de metadatos pesados (campo `extra`) innecesarios para la vista general.

## La Estrategia de Solución

### 1. Saneamiento de Base de Datos
Corregí el proceso de inserción mediante comprobaciones previas, eliminando la redundancia y normalizando los tiempos de respuesta de SQL.

### 2. Implementación de Lazy Loading
Refactoricé el flujo para soportar **paginación real**. El frontend ahora solo solicita los registros necesarios para la vista actual.

### 3. Rediseño de Arquitectura
Separé la información en dos niveles: una **Vista de Grilla** ligera para búsquedas rápidas y una **Vista de Detalle** bajo demanda.

## El Resultado
Logramos reducir el tiempo de respuesta en un **98%**, pasando de 180 segundos a una respuesta casi instantánea de **2 segundos**.

> **Lección de ingeniería:** Saber segmentar la información y limpiar la redundancia es tan importante como escribir código nuevo.
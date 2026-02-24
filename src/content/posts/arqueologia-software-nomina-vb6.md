---
title: "Sincronización Crítica: Resolviendo Inconsistencias en una Migración de Nómina Legacy"
description: "Diagnóstico y corrección de un motor de liquidación en Visual Basic 6.0 integrado con .NET 6."
date: "2026-02-23"
tags: ["Legacy", ".NET 6", "VB6", "SQL Server", "Troubleshooting"]
---

## El Escenario
En una empresa de telefonía móvil, coexistían dos mundos: un sistema **Cliente/Servidor en Visual Basic 6.0** y un nuevo **Portal Web en Angular y .NET 6**. Ambos compartían la misma base de datos debido a un proceso de migración gradual.

El motor de nómina, un proceso extremadamente complejo y probado, se mantenía en el sistema antiguo empaquetado en una **DLL**. El nuevo producto invocaba esta DLL para ejecutar liquidaciones globales, parciales y asientos contables.

## El Problema
A pesar de que el motor "ya funcionaba", empezaron a surgir **inconsistencias críticas** en los asientos contables y liquidaciones durante las pruebas finales. Con los plazos de entrega agotándose y la presión del despliegue a producción, el proyecto estaba en riesgo.

## El Diagnóstico: Ingeniería Inversa y Diagramación
Para resolver un problema de esta naturaleza, donde el código fuente es una "caja negra" de décadas atrás, seguí este proceso:

1.  **Entorno Controlado:** Monté una VM con Windows 7 para ejecutar el IDE de VB6 y analizar el código fuente de la DLL.
2.  **Debug Híbrido:** Debugueé la capa de .NET 6 para mapear exactamente qué datos se enviaban a la DLL y qué se esperaba de vuelta.
3.  **Debugger Manual:** Debido a la dificultad de debuguear en tiempo real entre ambas tecnologías, utilicé papel y lápiz para trazar un **diagrama de flujo detallado**, identificando cada salto de datos y transformación lógica.

## La Solución Técnica

### 1. Corrección en Asientos Contables
Identifiqué que el proceso realizaba cálculos redundantes. Se tomaban valores "en crudo" de tablas de procesamiento cuando ya existía una tabla con los valores finales procesados por otro módulo.
* **Acción:** Comenté la lógica de cálculo obsoleta (manteniendo la documentación del porqué) y redirigí el flujo para consumir directamente el valor pre-calculado.

### 2. Modernización del Flujo de Liquidaciones
El motor dependía de "Conceptos" (grupos de información con reglas de cálculo). Un concepto base había quedado en desuso, causando errores en las liquidaciones mensuales y trimestrales.
* **Acción:** En lugar de dejar los conceptos fijos (hardcoded) en la DLL antigua, modifiqué la integración para que los conceptos válidos se inyectaran dinámicamente desde el código moderno en .NET.

## Resultado
Tras sesiones de pruebas con los especialistas de nómina en el ambiente de QA, se validó la integridad de los datos. El proyecto se entregó en el plazo acordado y se realizó una presentación técnica al cliente explicando la resolución sin comprometer la confianza en el producto.

## Aprendizaje
La modernización no es solo escribir código nuevo; es entender profundamente el pensamiento de quienes diseñaron la solución original. Revisar código legacy me enseñó que **respetar la lógica de negocio antigua es vital para asegurar la consistencia en el futuro.**
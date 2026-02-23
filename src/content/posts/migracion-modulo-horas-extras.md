---
title: "Ingeniería de Producto: Integración y Parametrización del Módulo de Horas Extras"
date: "2026-02-22"
tags: ["Product Engineering", ".NET 6", "Angular", "Scalability"]
categories: ["Casos de Estudio", "Día a día de un Ingeniero"]
author: "Ricardo Esparza"
description: "Cómo integré un módulo crítico de horas extras en un portal de RR.HH. existente, implementando flujos dinámicos y motores de cálculo parametrizables."
showToc: true
---

## El Escenario
El reto no era construir una aplicación desde cero, sino **extender un ecosistema de Recursos Humanos ya robusto**. El portal necesitaba un módulo de "Horas Extras" que reemplazara una lógica legacy en VB6, pero con una condición: debía integrarse orgánicamente en la arquitectura actual de **Angular y .NET 6**.

## El Reto: Adaptación y Flexibilidad
A diferencia de un desarrollo independiente, aquí tuve que respetar los patrones de diseño y la infraestructura ya establecida, asegurando que el nuevo módulo se sintiera como una parte nativa del sistema.

### 1. Reingeniería de Flujos Dinámicos
En lugar de programar un flujo rígido, analicé cómo el portal gestionaba las aprobaciones existentes:
* **Acción:** Repliqué y adapté el motor de flujos dinámicos para que el cliente pudiera definir quién aprueba qué, dependiendo de la jerarquía organizacional.
* **Resultado:** El módulo heredó la flexibilidad del portal, permitiendo cambios en la cadena de mando sin tocar una sola línea de código.

### 2. Parametrización de Cálculos (Motor de Reglas)
Uno de los mayores dolores de cabeza del sistema antiguo era que los porcentajes y topes de horas extras estaban "hardcodeados" en el código de la DLL.
* **Solución:** Implementé un sistema de **parametrización desde la interfaz**. Ahora, los administradores pueden ajustar recargos nocturnos, porcentajes de feriados o límites legales directamente desde el portal.
* **Impacto:** Transformé una tarea de mantenimiento que antes requería un programador y una nueva compilación, en una tarea administrativa de 5 minutos.

### 3. Integración Transaccional con Nómina
El módulo no solo captura datos; debe "sentarlos" en tablas de nómina históricas con absoluta precisión. Aseguré que la persistencia de datos cumpliera con las reglas de integridad del portal, evitando discrepancias en el pago final.

## Impacto del Proyecto
* **Escalabilidad:** Al parametrizar los cálculos, el sistema quedó blindado ante cambios en las leyes laborales de diferentes países.
* **Eficiencia Operativa:** El equipo de soporte técnico dejó de recibir tickets para "ajustes de fórmulas", ya que ahora el cliente tiene el control total.
* **Mantenibilidad:** El módulo sigue los estándares del portal, facilitando futuras actualizaciones por cualquier miembro del equipo.

> **Reflexión de Ingeniería:** El verdadero valor de un desarrollador no es solo escribir código nuevo, sino saber extender sistemas existentes de forma inteligente, dejando herramientas que permitan al negocio ser autosuficiente.
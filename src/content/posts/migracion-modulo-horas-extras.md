---
title: "Modernización de Sistemas Críticos: Migración de Módulo de Horas Extras a .NET 6"
description: "De un entorno rígido en VB6 a una solución web dinámica, parametrizada y con flujos de aprobación flexibles."
date: "2026-02-24"
tags: ["Reingeniería", ".NET 6", "Oracle", "AngularJS", "Software Architecture"]
---

## El Desafío Técnico
El proyecto consistía en migrar el módulo de gestión de horas extras de una empresa de telefonía. El sistema origen, llamado "Web Tools", dependía de un ejecutable en **Visual Basic 6.0** para cualquier modificación lógica, mientras que el destino era un portal moderno (**PW+**) basado en **AngularJS** y **.NET 6**, ambos compartiendo una base de datos **Oracle**.

El reto no era solo la traducción de código, sino la evolución funcional:
1.  **Flujos Dinámicos:** Respetar y potenciar la creación de rutas de aprobación.
2.  **Parametrización:** Eliminar valores embebidos (hardcoded) para permitir cambios en los cálculos sin tocar el código.
3.  **Gestión de Feriados:** Implementar un motor de fechas para distinguir recargos provinciales y nacionales.

## Mi Proceso de Ingeniería

### 1. Arqueología de Código y Diagramación
Utilicé **Notepad++** para documentar el flujo legacy, extrayendo las queries de Oracle y las reglas de negocio ocultas en el entorno de VB6. Con esto, diseñé diagramas de flujo en **Lucidchart** para visualizar el "as-is" antes de proponer el "to-be".

### 2. Diseño de Parametrización por Rangos
Identifiqué que los recargos variaban según el horario del empleado. En lugar de una lógica lineal, implementé un **módulo de parametrización de rangos**. Dividí los grupos en matutino, vespertino y nocturno, permitiendo que el cliente ajuste los porcentajes de recarga de forma independiente para cada grupo desde la UI.

### 3. Motor de Feriados a Medida
A diferencia de usar una API externa, el cliente requería control total manual. Desarrollé un módulo CRUD para feriados con:
* Clasificación Nacional/Provincial.
* Control de auditoría mediante `updatedAt`.
* Lógica de prevención de duplicidad por año.

### 4. Flujo de Aprobación y Experiencia de Usuario (UX)
Desarrollé la interfaz de solicitud en una sola página (Single Page) con reglas de negocio estrictas:
* **Validación de Estado:** Bloqueo de nuevas solicitudes si existe una pendiente.
* **Simulador de Liquidación:** Antes de enviar, el empleado puede ver un desglose del valor estimado de sus horas.
* **Workflow Dinámico:** Integración con el motor de .NET 6 para permitir que RR.HH. cambie los niveles de aprobación (ej. de un solo nivel a requerir validación de nómina) sin intervención de desarrollo.



## La Solución: El "Antes y Después"
El sistema pasó de ser una "caja negra" difícil de mantener a una herramienta ágil. El cliente ahora tiene autonomía total para modificar quién aprueba y cuánto se paga por cada hora extra según la ley vigente o acuerdos internos, todo a través de parámetros en el portal.

## Aprendizaje de Ingeniería
Este proyecto me demostró que **modernizar no es solo cambiar el lenguaje de programación**. Muchas empresas no buscan "tecnología nueva" por moda, sino agilidad. Ganar la confianza del cliente dependió de entender su solución antigua y entregar algo que, respetando su esencia, fuera significativamente más sencillo y rápido de operar.
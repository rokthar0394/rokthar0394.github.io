---
title: "Arqueología de Software: Rescatando un Proceso de Nómina en VB6"
date: "2026-02-22"
tags: ["Legacy Code", "Visual Basic 6", ".NET 6", "Troubleshooting"]
categories: ["Casos de Estudio", "Día a día de un Ingeniero"]
author: "Ricardo Esparza"
description: "Crónica de cómo realicé ingeniería inversa a una DLL legacy para corregir errores críticos en la liquidación de haberes y asientos contables."
showToc: true
---

## El Contexto: Un Puente entre dos Épocas
En el proceso de modernización de nuestra plataforma, nos encontramos con un componente híbrido: una interfaz moderna en **AngularJS y .NET 6** que dependía de una lógica de negocio compleja encapsulada en una **DLL de Visual Basic 6.0**.

Esta DLL manejaba el corazón financiero del sistema: liquidaciones de nómina y generación de asientos contables. Se detectaron inconsistencias graves en los cálculos que impedían el cierre contable de varios clientes.

## El Reto de la Caja Negra
El mayor obstáculo no era solo el lenguaje, sino el entorno. Al no existir documentación actualizada ni posibilidad de realizar un *debugging* directo desde el entorno moderno, tuve que retroceder en el tiempo:

1. **Entorno Controlado:** Configuré una máquina virtual con **Windows 7** para poder abrir el proyecto original en el IDE de Visual Basic 6.
2. **Análisis Forense:** Sin rastro de flujos lógicos, utilicé la técnica de **papel y lápiz** para mapear cada llamada que el código .NET hacía hacia la DLL y entender cómo se transformaban los datos internamente.

## Diagnóstico y Resolución

### 1. El Error en los Asientos Contables
Identifiqué que la DLL estaba realizando punteros a campos de datos obsoletos. Tras una actualización previa del esquema de base de datos, el código legacy seguía buscando el valor en `campo1` cuando la lógica de negocio actual ya lo había migrado a `campo2`.

### 2. Inconsistencia en Liquidaciones
Descubrí conceptos de liquidación cuyos códigos habían sido modificados en la base de datos, pero permanecían "hardcodeados" en la lógica de la DLL. Esto causaba que ciertas liquidaciones parciales no se procesaran correctamente.

## La Solución Final
Tras corregir la lógica, realicé la compilación de la nueva DLL y ejecuté un plan de pruebas riguroso en un ambiente de *staging* para asegurar que la integración con .NET 6 fuera perfecta. 

**Resultado:** Se restableció la integridad de los procesos de nómina, permitiendo a los clientes generar sus asientos contables sin errores y garantizando el pago exacto a los empleados.

> **Reflexión:** Ser un buen ingeniero a veces significa saber ser un buen historiador. Respetar y entender el código que se escribió hace 20 años es fundamental para poder modernizarlo con éxito.
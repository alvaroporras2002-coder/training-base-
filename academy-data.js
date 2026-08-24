// Source-derived case catalog from the current v14 simulator.
// Keep this file next to app.js in the repository root.

export const CASES = [
  {
    "id": 1,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["performance", "menu", "settings"],
    "es": {
      "title": "Bajo volumen de órdenes",
      "persona": "Dueño con 3 meses en la plataforma",
      "context": "El restaurante vende poco en DoorDash y el dueño considera abandonar la plataforma.",
      "objection": "“Pago comisiones, pero no veo resultados.”",
      "first": "Entiendo que pagar por un canal sin ver crecimiento es frustrante. Antes de recomendar descuentos, revisemos juntos la visibilidad, las fotos y los horarios de tu tienda.",
      "root": "El menú no tiene fotos profesionales y la tienda cierra en la app antes del pico de cena.",
      "action": "Subir cinco fotos clave, extender el horario de entrega a domicilio hasta las 9 p. m. y hacer una prueba controlada de 30 días.",
      "close": "Confirmar los cambios guardados y comparar ventas, órdenes y conversión después de dos semanas y al final de los 30 días."
    },
    "en": {
      "title": "Low order volume",
      "persona": "Owner in the first three months on the platform",
      "context": "The restaurant has low DoorDash sales and the owner is considering leaving.",
      "objection": "“I pay commissions, but I am not seeing results.”",
      "first": "I understand why paying for a channel without seeing growth is frustrating. Before recommending discounts, let us review your visibility, photos, and store hours together.",
      "root": "The menu has no professional photos and the store closes in the app before the dinner peak.",
      "action": "Upload five key photos, extend delivery hours to 9 p.m., and run a controlled 30-day test.",
      "close": "Confirm the saved changes and compare sales, orders, and conversion after two weeks and again at day 30."
    }
  },

  {
    "id": 2,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["financials", "menu"],
    "es": {
      "title": "Queja por comisiones",
      "persona": "Dueño preocupado por el margen",
      "context": "La competencia ofreció una comisión menor y el dueño siente que DoorDash destruye su rentabilidad.",
      "objection": "“Tus comisiones están matando mi ganancia.”",
      "first": "Proteger tu margen es la prioridad. Antes de negociar solo la tasa, quiero revisar contigo los precios de entrega a domicilio y la utilidad real de tus artículos más vendidos.",
      "root": "Los precios de DoorDash son iguales a los del local y no absorben empaque, insumos ni comisión.",
      "action": "Ajustar entre 10% y 15% los productos más vendidos y medir el efecto sobre margen y volumen.",
      "close": "Verificar los nuevos precios en el menú y revisar margen neto, valor promedio del pedido y órdenes dentro de 30 días."
    },
    "en": {
      "title": "Commission complaint",
      "persona": "Owner focused on margin protection",
      "context": "A competitor offered a lower rate and the merchant feels DoorDash is destroying profitability.",
      "objection": "“Your commissions are killing my profit.”",
      "first": "Protecting your margin is the priority. Before focusing only on the rate, I want to review delivery pricing and the real profitability of your best-selling items with you.",
      "root": "DoorDash prices match dine-in prices and do not absorb packaging, ingredient, or commission costs.",
      "action": "Adjust the best-selling items by 10% to 15% and measure the effect on margin and volume.",
      "close": "Verify the new menu prices and review net margin, AOV, and orders within 30 days."
    }
  },

  {
    "id": 3,
    "category": "technical",
    "difficulty": "easy",
    "pages": ["performance", "orders"],
    "es": {
      "title": "Artículos faltantes",
      "persona": "Gerente de un restaurante muy ocupado",
      "context": "Los clientes reportan artículos faltantes y el equipo de cocina está saturado.",
      "objection": "“No tenemos tiempo para revisar cada bolsa.”",
      "first": "Entiendo el impacto que esto tiene en tu reputación. ¿Cómo empacan y verifican las bolsas durante las horas pico?",
      "root": "El empaque es caótico, no existe lista de verificación ni sello y nadie tiene una persona responsable de la revisión final.",
      "action": "Implementar un lista de verificación visual, sellos de seguridad y una verificación rápida del número de empaques contra el ticket.",
      "close": "Revisar durante dos semanas la tasa de artículos faltantes y confirmar que el proceso se use en cada turno."
    },
    "en": {
      "title": "Missing items",
      "persona": "Manager of a very busy restaurant",
      "context": "Customers report missing items while the kitchen team is overloaded.",
      "objection": "“We do not have time to check every bag.”",
      "first": "I understand the impact this has on your reputation. How are bags packed and verified during peak hours?",
      "root": "Packing is chaotic, there is no checklist or seal, and no one owns the final verification.",
      "action": "Use a visual checklist, safety seals, and a quick package-count check against the ticket.",
      "close": "Review the missing-item rate for two weeks and confirm that the process is used on every shift."
    }
  },

  {
    "id": 4,
    "category": "support",
    "difficulty": "medium",
    "pages": ["performance", "menu", "settings"],
    "es": {
      "title": "Recuperación de malas calificaciones",
      "persona": "Dueño de un restaurante tailandés",
      "context": "Las calificaciones caen por comida que viaja mal y retrasos en horas pico.",
      "objection": "“Las malas calificaciones no son justas.”",
      "first": "Tienes razón en que la comida viaja de forma distinta. Revisemos qué platos y horarios concentran las quejas para separar el síntoma de la causa.",
      "root": "El Pad Thai y las frituras viajan mal, y los viernes la cocina acepta más órdenes de las que puede preparar a tiempo.",
      "action": "Separar salsas, mejorar el empaque y aumentar el tiempo de preparación solo durante el pico del viernes.",
      "close": "Comparar calificación, quejas por producto y tiempo de preparación después de dos semanas."
    },
    "en": {
      "title": "Poor ratings recovery",
      "persona": "Owner of a Thai restaurant",
      "context": "Ratings are falling because some food travels poorly and peak-hour orders are late.",
      "objection": "“These bad ratings are not fair.”",
      "first": "You are right that food travels differently. Let us review which dishes and time periods concentrate the complaints so we can separate the symptom from the cause.",
      "root": "Pad Thai and fried items travel poorly, and on Fridays the kitchen accepts more orders than it can prepare on time.",
      "action": "Separate sauces, improve packaging, and increase prep time only during the Friday peak.",
      "close": "Compare rating, item-level complaints, and prep time after two weeks."
    }
  },

  {
    "id": 5,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["marketing", "performance"],
    "es": {
      "title": "Escepticismo ante promociones",
      "persona": "Dueño de un café enfocado en rentabilidad",
      "context": "El dueño cree que los descuentos atraen clientes que nunca regresan.",
      "objection": "“Las promociones solo me cuestan dinero.”",
      "first": "Estoy de acuerdo en que un descuento sin retorno no sirve. Diseñemos una prueba pequeña, dirigida y con un límite claro para medir si los clientes regresan.",
      "root": "La promoción anterior fue general, demasiado agresiva y nunca se midió la recompra a precio regular.",
      "action": "Crear una campaña solo para clientes nuevos, con tope de CA$50 y revisión de retención a los 14 días.",
      "close": "Confirmar el gasto, clientes nuevos, ROAS y porcentaje de recompra antes de decidir si se amplía o se apaga."
    },
    "en": {
      "title": "Promotion skepticism",
      "persona": "Café owner focused on profitability",
      "context": "The merchant believes discounts attract customers who never return.",
      "objection": "“Promotions only cost me money.”",
      "first": "I agree that a discount without a return is not useful. Let us design a small, targeted test with a clear cap and measure whether customers come back.",
      "root": "The previous promotion was broad, too aggressive, and repeat purchases at regular price were never measured.",
      "action": "Create a new-customer-only campaign with a CA$50 cap and a retention review after 14 days.",
      "close": "Confirm spend, new customers, ROAS, and repeat-purchase rate before expanding or stopping the campaign."
    }
  },

  {
    "id": 6,
    "category": "support",
    "difficulty": "medium",
    "pages": ["menu", "performance"],
    "es": {
      "title": "Resistencia a optimizar el menú",
      "persona": "Chef-propietario orgulloso de su marca",
      "context": "El chef se niega a retirar platos aunque varios viajan mal y complican la cocina.",
      "objection": "“Este menú representa mi marca.”",
      "first": "Quiero proteger tu marca, no mutilar tu menú. Revisemos juntos qué platos no sobreviven bien el viaje y cuáles representan mejor tu experiencia en entrega a domicilio.",
      "root": "Algunos platos delicados llegan mal, el equipo odia empacarlos y pocas opciones generan la mayor parte de las ventas.",
      "action": "Crear una sección “Selección del Chef para entrega a domicilio” con los platos que viajan bien y ocultar los problemáticos solo en entrega a domicilio.",
      "close": "Verificar la nueva sección en la vista previa del menú y revisar quejas, conversión y carga operativa en 30 días."
    },
    "en": {
      "title": "Menu optimization resistance",
      "persona": "Chef-owner protective of the brand",
      "context": "The chef refuses to remove dishes even though several travel poorly and complicate the kitchen.",
      "objection": "“This menu represents my brand.”",
      "first": "I want to protect your brand, not cut apart your menu. Let us review which dishes do not survive the trip and which ones best represent your delivery experience.",
      "root": "Some delicate dishes arrive poorly, the team dislikes packing them, and a small group of items drives most sales.",
      "action": "Create a “Chef’s Delivery Selection” with dishes that travel well and hide the problematic items only from delivery.",
      "close": "Verify the new section in Preview Menu and review complaints, conversion, and operational load after 30 days."
    }
  },

  {
    "id": 7,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["performance", "marketing"],
    "es": {
      "title": "Amenaza de la competencia",
      "persona": "Operador de varias sucursales",
      "context": "Una app competidora ofrece menor comisión, visibilidad y atención estratégica.",
      "objection": "“¿Por qué debería priorizar DoorDash?”",
      "first": "Es válido evaluar alternativas. Además de la comisión, ¿qué apoyo o flexibilidad te ofrece la competencia que hoy sientes que no recibes de nosotros?",
      "root": "El dueño busca atención estratégica y usa la oferta como palanca; DoorDash todavía genera la mayor parte del volumen.",
      "action": "Proponer un plan de mejora de 30 días con revisiones quincenales, métricas por sucursal y compromisos claros.",
      "close": "Enviar la primera reunión y el reporte de las tiendas principales, y revisar el desempeño al finalizar los 30 días."
    },
    "en": {
      "title": "Competitor platform threat",
      "persona": "Multi-location operator",
      "context": "A competitor offers a lower rate, visibility, and strategic attention.",
      "objection": "“Why should I prioritize DoorDash?”",
      "first": "It is reasonable to evaluate alternatives. Beyond commission, what support or flexibility is the competitor offering that you feel you are not receiving from us today?",
      "root": "The merchant wants strategic attention and is using the offer as leverage; DoorDash still drives most of the volume.",
      "action": "Propose a 30-day improvement plan with biweekly reviews, location-level metrics, and clear commitments.",
      "close": "Send the first meeting and the report for the main stores, then review performance at the end of the 30 days."
    }
  },

  {
    "id": 8,
    "category": "technical",
    "difficulty": "medium",
    "pages": ["performance", "settings"],
    "es": {
      "title": "Tiempos de preparación tardíos",
      "persona": "Gerente de un restaurante de ramen",
      "context": "Los Dashers esperan porque el tiempo de preparación está mal configurado en horas pico.",
      "objection": "“Los conductores llegan demasiado temprano.”",
      "first": "Tener Dashers esperando en la puerta es molesto para tu equipo y tus clientes. Revisemos si el tiempo configurado cambia realmente durante el pico de cena.",
      "root": "La tienda usa 15 minutos todo el día, aunque viernes y sábado necesita entre 25 y 30 minutos y no usa pausa.",
      "action": "Configurar tiempos por día y franja horaria y enseñar el uso de Pausar pedidos durante saturación.",
      "close": "Confirmar el horario guardado y medir tiempo de espera, pedidos tardíos y pausas durante los siguientes dos fines de semana."
    },
    "en": {
      "title": "Late prep times",
      "persona": "Manager of a ramen restaurant",
      "context": "Dashers wait because prep time is misconfigured during peak periods.",
      "objection": "“Drivers arrive too early.”",
      "first": "Having Dashers waiting at the door is disruptive for your team and dine-in customers. Let us check whether the configured prep time reflects the dinner peak.",
      "root": "The store uses 15 minutes all day even though Friday and Saturday need 25 to 30 minutes, and the pause tool is not used.",
      "action": "Configure prep times by day and daypart and teach the team to pause orders when the kitchen is overloaded.",
      "close": "Confirm the saved schedule and measure Dasher wait time, late orders, and pauses over the next two weekends."
    }
  },

  {
    "id": 9,
    "category": "finance",
    "difficulty": "easy",
    "pages": ["menu", "settings", "marketing"],
    "es": {
      "title": "Ansiedad por lanzamiento de nueva tienda",
      "persona": "Dueño que abre una segunda ubicación",
      "context": "El dueño invirtió sus ahorros y exige ventas masivas desde el primer día.",
      "objection": "“Necesito pedidos de inmediato. ¿Qué me garantiza DoorDash?”",
      "first": "Entiendo la presión de flujo de caja, pero no quiero prometer un volumen que ponga en riesgo una operación nueva. Revisemos personal, menú y horarios antes de acelerar la demanda.",
      "root": "La nueva tienda tiene poco personal, el menú no está finalizado y un lanzamiento masivo podría generar errores y malas reseñas.",
      "action": "Hacer un lanzamiento escalonado: semana 1 con menú reducido y semana 2 con menú completo y promociones controladas.",
      "close": "Confirmar menú, horarios y capacidad antes de abrir, y revisar precisión, tiempos y ventas al terminar cada semana."
    },
    "en": {
      "title": "New store launch anxiety",
      "persona": "Owner opening a second location",
      "context": "The merchant invested personal savings and demands massive sales on day one.",
      "objection": "“I need orders immediately. What does DoorDash guarantee?”",
      "first": "I understand the cash-flow pressure, but I do not want to promise volume that could put a new operation at risk. Let us review staffing, menu, and hours before accelerating demand.",
      "root": "The new store has limited staff, the menu is not final, and a massive launch could create errors and poor reviews.",
      "action": "Use a phased launch: week one with a reduced menu and week two with the full menu and controlled promotions.",
      "close": "Confirm menu, hours, and capacity before opening, then review accuracy, timing, and sales after each week."
    }
  },

  {
    "id": 10,
    "category": "support",
    "difficulty": "hard",
    "pages": ["settings", "menu"],
    "es": {
      "title": "Cumplimiento de alcohol",
      "persona": "Dueño de un bar y parrilla",
      "context": "El dueño quiere vender alcohol, pero teme perder su licencia por una entrega indebida.",
      "objection": "“No quiero problemas legales ni poner mi licencia en riesgo.”",
      "first": "Tu licencia es lo primero. Antes de activar nada, revisemos paso a paso los requisitos, la verificación de identidad y las responsabilidades de cada parte.",
      "root": "El dueño no entiende la separación de responsabilidades ni el proceso de verificación de identidad en la entrega.",
      "action": "Revisar la guía de cumplimiento, explicar el flujo de verificación y avanzar solo cuando la tienda confirme que puede cumplir todos los requisitos.",
      "close": "Documentar la revisión, confirmar que el equipo comprende el proceso y comenzar con un piloto limitado únicamente si todo está validado."
    },
    "en": {
      "title": "Alcohol delivery compliance",
      "persona": "Bar and grill owner",
      "context": "The merchant wants to sell alcohol but fears losing the license because of an improper delivery.",
      "objection": "“I do not want legal problems or to put my license at risk.”",
      "first": "Your license comes first. Before activating anything, let us review the requirements, identity verification, and each party’s responsibilities step by step.",
      "root": "The merchant does not understand the responsibility split or the identity-verification process at delivery.",
      "action": "Review the compliance guide, explain the verification flow, and move forward only when the store confirms it can meet every requirement.",
      "close": "Document the review, confirm that the team understands the process, and begin with a limited pilot only after everything is validated."
    }
  },

  {
    "id": 11,
    "category": "technical",
    "difficulty": "medium",
    "pages": ["orders", "menu"],
    "es": {
      "title": "Alta tasa de cancelación",
      "persona": "Gerente de un restaurante de sushi",
      "context": "La tienda cancela pedidos cuando se agotan ingredientes y culpa a la aplicación.",
      "objection": "“Cancelamos porque piden cosas que ya no tenemos.”",
      "first": "Entiendo que el inventario fresco se agota y no conviene comprar de más. Revisemos cómo marcan ingredientes agotados durante el servicio.",
      "root": "El equipo apaga artículos uno por uno, no usa el control por ingrediente y nadie es responsable de actualizar disponibilidad.",
      "action": "Usar la función de ingrediente agotado y asignar a la cajera como responsable de actualizar la disponibilidad por turno.",
      "close": "Confirmar que el ingrediente ocultó todos los artículos relacionados y revisar la tasa de cancelación durante las siguientes dos semanas."
    },
    "en": {
      "title": "High cancellation rate",
      "persona": "Manager of a sushi restaurant",
      "context": "The store cancels orders when ingredients run out and blames the app.",
      "objection": "“We cancel because customers order things we no longer have.”",
      "first": "I understand that fresh inventory runs out and buying too much is not practical. Let us review how unavailable ingredients are marked during service.",
      "root": "The team turns off items one by one, does not use ingredient-level availability, and no one owns updates.",
      "action": "Use the unavailable-ingredient function and assign the cashier to update availability on each shift.",
      "close": "Confirm that the ingredient hid every related item and review the cancellation rate over the next two weeks."
    }
  },

  {
    "id": 12,
    "category": "finance",
    "difficulty": "hard",
    "pages": ["performance", "marketing"],
    "es": {
      "title": "Conversación estratégica de crecimiento",
      "persona": "Director regional de 12 restaurantes",
      "context": "El cliente exige una estrategia ejecutiva y rechaza consejos genéricos.",
      "objection": "“Necesitamos una estrategia real, no consejos básicos.”",
      "first": "Para 12 ubicaciones, una recomendación genérica no sirve. Quiero comparar rendimiento, ticket y operación por sucursal antes de proponer inversión.",
      "root": "Las tiendas tienen comportamientos distintos y el director quiere decisiones por ubicación, QBR y pruebas controladas.",
      "action": "Preparar una QBR con mapas de calor, métricas por tienda y pruebas A/B de presupuesto por zona.",
      "close": "Enviar una agenda con los reportes requeridos y celebrar la QBR con gerentes operativos dentro de una semana."
    },
    "en": {
      "title": "Strategic growth conversation",
      "persona": "Regional director of 12 restaurants",
      "context": "The client demands an executive strategy and rejects generic advice.",
      "objection": "“We need a real strategy, not basic advice.”",
      "first": "For 12 locations, a generic recommendation is not useful. I want to compare performance, ticket size, and operations by store before proposing investment.",
      "root": "Stores behave differently, and the director wants location-level decisions, QBRs, and controlled tests.",
      "action": "Prepare a QBR with demand heat maps, store-level metrics, and A/B budget tests by area.",
      "close": "Send an agenda with the required reports and hold the QBR with operations managers within one week."
    }
  },

  {
    "id": 13,
    "category": "support",
    "difficulty": "hard",
    "pages": ["financials", "orders"],
    "es": {
      "title": "Dueño enojado tras una mala experiencia con soporte",
      "persona": "Dueño frustrado por un ajuste de pagos",
      "context": "Soporte cerró varios tickets sin resolver una deducción incorrecta.",
      "objection": "“Nadie en DoorDash me ayuda y tienen mi dinero.”",
      "first": "Entiendo tu enojo y te pido una disculpa. A partir de ahora yo me hago cargo; dame el folio para revisarlo contigo en este momento.",
      "root": "El ticket fue clasificado de forma incorrecta y la confianza se perdió por transferencias y cierres sin solución.",
      "action": "Revisar el folio, corregir la clasificación, solicitar el ajuste y enviar confirmación escrita antes de cerrar.",
      "close": "Confirmar el monto y la fecha del próximo corte, enviar el correo prometido y programar seguimiento hasta que se refleje."
    },
    "en": {
      "title": "Angry merchant after a bad support experience",
      "persona": "Owner frustrated by a payment adjustment",
      "context": "Support closed multiple tickets without resolving an incorrect deduction.",
      "objection": "“No one at DoorDash helps me, and you have my money.”",
      "first": "I understand your anger, and I am sorry. From this point I will own the case; give me the ticket number so we can review it together now.",
      "root": "The ticket was misclassified, and trust was lost through transfers and closures without a resolution.",
      "action": "Review the ticket, correct the classification, request the adjustment, and send written confirmation before closing.",
      "close": "Confirm the amount and next payout date, send the promised email, and follow up until the adjustment appears."
    }
  },

  {
    "id": 14,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["financials", "menu"],
    "es": {
      "title": "Menú de entrega a domicilio no rentable",
      "persona": "Dueño de un restaurante de mariscos",
      "context": "Las ventas crecen, pero los costos de insumos, empaque y comisión eliminan la utilidad.",
      "objection": "“Vendo más, pero al final del mes no gano dinero.”",
      "first": "De nada sirve aumentar volumen si el margen neto desaparece. Revisemos costo, empaque y utilidad por artículo antes de cambiar todo el menú.",
      "root": "Los precios son iguales a los del local, el empaque no está incluido y varios productos de alto volumen tienen margen débil.",
      "action": "Ajustar cerca de 12% los tres artículos más costosos y crear dos combos de entrega a domicilio con mayor ticket y mejor margen.",
      "close": "Verificar precios y combos en la vista previa del menú y revisar margen por artículo, valor promedio del pedido y volumen después de 30 días."
    },
    "en": {
      "title": "Unprofitable delivery menu",
      "persona": "Owner of a seafood restaurant",
      "context": "Sales are growing, but ingredient, packaging, and commission costs eliminate profit.",
      "objection": "“I sell more, but I do not make money at the end of the month.”",
      "first": "There is no value in growing volume if net margin disappears. Let us review item cost, packaging, and profitability before changing the entire menu.",
      "root": "Prices match dine-in, packaging is not included, and several high-volume items have weak margins.",
      "action": "Adjust the three most expensive items by about 12% and create two delivery bundles with a higher ticket and better margin.",
      "close": "Verify prices and bundles in Preview Menu and review item margin, AOV, and volume after 30 days."
    }
  },

  {
    "id": 15,
    "category": "finance",
    "difficulty": "medium",
    "pages": ["marketing", "performance"],
    "es": {
      "title": "Rechazo a Sponsored Listings",
      "persona": "Dueño de una sanguchería popular",
      "context": "El dueño considera abusivo pagar publicidad además de la comisión.",
      "objection": "“No debería pagar extra para que me vean.”",
      "first": "Entiendo tu postura: no tiene sentido invertir otro dólar sin saber qué retorno produce. Revisemos el objetivo y pongamos un límite que puedas controlar.",
      "root": "El dueño no entiende la diferencia entre comisión y visibilidad patrocinada, pero quiere más pedidos de almuerzo y aceptaría una prueba medible.",
      "action": "Crear un piloto de siete días con tope total de CA$30 y objetivo mínimo de 4× en ventas.",
      "close": "Revisar gasto, ventas atribuidas, ROAS y nuevos clientes el siguiente martes antes de renovar."
    },
    "en": {
      "title": "Refusing Sponsored Listings",
      "persona": "Owner of a popular sandwich shop",
      "context": "The merchant believes paying for ads in addition to commission is abusive.",
      "objection": "“I should not have to pay extra to be seen.”",
      "first": "I understand your position: investing another dollar makes no sense without knowing the return. Let us review the objective and set a cap you can control.",
      "root": "The merchant does not understand the difference between commission and sponsored visibility, but wants more lunch orders and would accept a measurable test.",
      "action": "Create a seven-day pilot with a total CA$30 cap and a minimum 4× sales target.",
      "close": "Review spend, attributed sales, ROAS, and new customers the following Tuesday before renewing."
    }
  },

  {
    "id": 16,
    "category": "support",
    "difficulty": "hard",
    "pages": ["performance", "settings"],
    "es": {
      "title": "Bajo rendimiento en múltiples ubicaciones",
      "persona": "Gerente de operaciones de seis sucursales",
      "context": "Dos tiendas venden mucho menos y el operador quiere apagarlas para ahorrar tiempo.",
      "objection": "“DoorDash funciona en unas zonas y en otras no.”",
      "first": "Si cuatro tiendas funcionan con el mismo menú y dos no, vale la pena comparar la operación antes de concluir que no existe demanda.",
      "root": "Las dos tiendas cierran la tableta dos horas antes, tienen preparación 30% más lenta y menor consistencia operativa.",
      "action": "Crear un plan específico para las tiendas 5 y 6 con horarios correctos, tiempos de preparación por pico y reporte para sus gerentes.",
      "close": "Confirmar las configuraciones por ubicación y comparar ventas, horas abiertas y tiempos de preparación después de dos semanas."
    },
    "en": {
      "title": "Multi-location underperformance",
      "persona": "Operations manager for six locations",
      "context": "Two stores sell much less, and the operator wants to turn them off to save time.",
      "objection": "“DoorDash works in some areas and not in others.”",
      "first": "If four stores work with the same menu and two do not, we should compare operations before concluding there is no demand.",
      "root": "The two stores close the tablet two hours early, have prep times that are 30% slower, and operate less consistently.",
      "action": "Create a specific plan for stores 5 and 6 with correct hours, peak prep-time settings, and a report for their managers.",
      "close": "Confirm settings by location and compare sales, open hours, and prep times after two weeks."
    }
  },

  {
    "id": 17,
    "category": "support",
    "difficulty": "hard",
    "pages": ["menu", "settings"],
    "es": {
      "title": "Preocupación de marca premium",
      "persona": "Dueño de un restaurante de alta cocina",
      "context": "El dueño teme que el delivery abarate la marca y arruine la presentación.",
      "objection": "“El delivery no encaja con nuestra experiencia.”",
      "first": "Estoy de acuerdo en que una marca premium no debe entregarse como comida rápida. Revisemos qué experiencia sí podemos proteger fuera del restaurante.",
      "root": "El riesgo real es presentación, temperatura y reputación; algunos platos sí viajan bien y existe interés en almuerzos corporativos.",
      "action": "Crear un menú curado de cinco platos, usar empaque premium y limitar el piloto a almuerzos corporativos.",
      "close": "Verificar el menú y horario del piloto y revisar comentarios, temperatura, ticket promedio y recompra de clientes corporativos."
    },
    "en": {
      "title": "Premium brand concern",
      "persona": "Owner of a fine-dining restaurant",
      "context": "The merchant fears delivery will cheapen the brand and damage presentation.",
      "objection": "“Delivery does not fit our experience.”",
      "first": "I agree that a premium brand should not be delivered like fast food. Let us determine which experience we can protect outside the restaurant.",
      "root": "The real risks are presentation, temperature, and reputation; some dishes travel well, and corporate lunch demand is attractive.",
      "action": "Create a curated five-item menu, use premium packaging, and limit the pilot to corporate lunches.",
      "close": "Verify the pilot menu and hours, then review feedback, temperature, AOV, and corporate repeat orders."
    }
  },

  {
    "id": 18,
    "category": "technical",
    "difficulty": "easy",
    "pages": ["pos", "settings", "orders"],
    "es": {
      "title": "Problema de adopción de la tableta",
      "persona": "Dueño de un restaurante familiar",
      "context": "El equipo pierde pedidos porque la tableta está lejos, molesta y nadie se responsabiliza.",
      "objection": "“La tableta interrumpe nuestro trabajo.”",
      "first": "Cuando el restaurante está lleno, una tableta lejos del flujo se convierte en un problema. ¿Dónde está ubicada y quién se responsabiliza hoy de aceptarla?",
      "root": "La tableta está en la oficina trasera, el equipo no está entrenado y no existe un responsable por turno.",
      "action": "Moverla al mostrador, conectarla a la impresora y asignar a la cajera como dueña de la tableta en cada turno.",
      "close": "Probar una orden, confirmar que el ticket imprime correctamente y revisar pedidos perdidos durante la semana siguiente."
    },
    "en": {
      "title": "Tablet adoption problem",
      "persona": "Owner of a family restaurant",
      "context": "The team misses orders because the tablet is far away, disruptive, and no one owns it.",
      "objection": "“The tablet disrupts our work.”",
      "first": "When the restaurant is busy, a tablet outside the workflow becomes a problem. Where is it located, and who is responsible for accepting orders today?",
      "root": "The tablet is in the back office, the team is not trained, and no one owns it on each shift.",
      "action": "Move it to the counter, connect it to the printer, and assign the cashier as tablet owner on every shift.",
      "close": "Test one order, confirm the ticket prints correctly, and review missed orders during the following week."
    }
  },

  {
    "id": 19,
    "category": "support",
    "difficulty": "hard",
    "pages": ["financials", "orders", "performance"],
    "es": {
      "title": "Disputa de reembolsos",
      "persona": "Dueño de un restaurante de alitas",
      "context": "El dueño está furioso por deducciones de reembolsos y cree que los clientes mienten.",
      "objection": "“DoorDash devuelve dinero a clientes mentirosos y me lo descuenta.”",
      "first": "Entiendo lo frustrante que es ver deducciones sobre órdenes que tu equipo preparó. Revisemos el reporte exacto antes de culpar a cualquier parte.",
      "root": "La mayoría de los reembolsos son parciales por Ranch, apio y sustituciones realizadas sin actualizar ni contactar al cliente.",
      "action": "Marcar artículos agotados, contactar al cliente antes de sustituir y usar un control de empaque para salsas y acompañamientos.",
      "close": "Enviar un reporte semanal y comparar reembolsos parciales, artículos faltantes y sustituciones durante la semana siguiente."
    },
    "en": {
      "title": "Refund dispute",
      "persona": "Owner of a chicken-wing restaurant",
      "context": "The merchant is furious about refund deductions and believes customers are lying.",
      "objection": "“DoorDash refunds dishonest customers and deducts it from me.”",
      "first": "I understand how frustrating it is to see deductions on orders your team prepared. Let us review the exact report before blaming either side.",
      "root": "Most refunds are partial claims for Ranch, celery, and substitutions made without updating the order or contacting the customer.",
      "action": "Mark items unavailable, contact the customer before substituting, and use a packing control for sauces and sides.",
      "close": "Send a weekly report and compare partial refunds, missing items, and substitutions over the following week."
    }
  },

  {
    "id": 20,
    "category": "support",
    "difficulty": "veryHard",
    "pages": ["performance", "marketing", "home"],
    "es": {
      "title": "Riesgo de abandono",
      "persona": "Socio histórico que quiere cancelar",
      "context": "Un restaurante de muchos años quiere irse porque la relación se volvió fría y transaccional.",
      "objection": "“Ya tomamos la decisión. Queremos cancelar.”",
      "first": "Te escucho. Si un socio de tantos años siente que ya no valemos la pena, es porque te hemos fallado. ¿En qué momento sentiste que te perdimos?",
      "root": "El problema principal no es la comisión: el dueño se siente abandonado y la competencia lo trata como socio estratégico.",
      "action": "Proponer un plan de rescate de 60 días con auditoría, reuniones quincenales, estrategia directa y compromisos concretos.",
      "close": "Enviar calendario y plan en diez minutos, definir métricas de éxito y revisar formalmente la decisión al terminar los 60 días."
    },
    "en": {
      "title": "Churn risk",
      "persona": "Long-time partner who wants to deactivate",
      "context": "A long-standing restaurant wants to leave because the relationship became cold and transactional.",
      "objection": "“We have made the decision. We want to cancel.”",
      "first": "I hear you. If a partner of so many years feels we are no longer worth it, then we have failed you. At what point did you feel we lost you?",
      "root": "The main problem is not commission: the merchant feels abandoned, while the competitor treats the business like a strategic partner.",
      "action": "Propose a 60-day recovery plan with an audit, biweekly meetings, direct strategy, and concrete commitments.",
      "close": "Send the calendar and plan within ten minutes, define success metrics, and formally review the decision at the end of the 60 days."
    }
  }
];

export const MODULES = [
  {
    "id": "foundations",
    "order": 1,
    "title": "Fundamentos y diagnóstico",
    "subtitle": "Aprende a investigar antes de recomendar cambios.",
    "caseIds": [1, 9],
    "icon": "◎",
    "color": "red"
  },
  {
    "id": "operations",
    "order": 2,
    "title": "Operaciones y calidad",
    "subtitle": "Pedidos, preparación, inventario, tablet y ejecución diaria.",
    "caseIds": [3, 8, 11, 18],
    "icon": "▦",
    "color": "green"
  },
  {
    "id": "menu-brand",
    "order": 3,
    "title": "Menú, reputación y marca",
    "subtitle": "Optimización de menú, ratings, rentabilidad y experiencia premium.",
    "caseIds": [4, 6, 14, 17],
    "icon": "◫",
    "color": "purple"
  },
  {
    "id": "growth-marketing",
    "order": 4,
    "title": "Marketing y crecimiento",
    "subtitle": "Promociones, Sponsored Listings, lanzamientos y estrategia multitienda.",
    "caseIds": [5, 12, 15, 16],
    "icon": "↗",
    "color": "blue"
  },
  {
    "id": "commercial-retention",
    "order": 5,
    "title": "Comercial y retención",
    "subtitle": "Comisiones, competencia y riesgo de abandono.",
    "caseIds": [2, 7, 20],
    "icon": "◆",
    "color": "amber"
  },
  {
    "id": "support-risk",
    "order": 6,
    "title": "Soporte, riesgo y cumplimiento",
    "subtitle": "Escalaciones, reembolsos y conversaciones de alto riesgo.",
    "caseIds": [10, 13, 19],
    "icon": "✓",
    "color": "slate"
  }
];

export const PAGE_LABELS = {
  "home": {
    "es": "Inicio",
    "en": "Home"
  },
  "orders": {
    "es": "Pedidos",
    "en": "Orders"
  },
  "menu": {
    "es": "Menú",
    "en": "Menu"
  },
  "financials": {
    "es": "Finanzas",
    "en": "Financials"
  },
  "performance": {
    "es": "Rendimiento",
    "en": "Performance"
  },
  "marketing": {
    "es": "Marketing",
    "en": "Marketing"
  },
  "settings": {
    "es": "Configuración",
    "en": "Settings"
  },
  "pos": {
    "es": "Herramienta POS",
    "en": "POS tool"
  }
};

export function getCase(caseId) {
  return (
    CASES.find(
      item =>
        item.id ===
        Number(caseId)
    ) ||
    CASES[0]
  );
}

export function getModule(moduleId) {
  return (
    MODULES.find(
      item =>
        item.id ===
        moduleId
    ) ||
    MODULES[0]
  );
}

export function moduleForCase(caseId) {
  return (
    MODULES.find(
      item =>
        item.caseIds.includes(
          Number(caseId)
        )
    ) ||
    MODULES[0]
  );
}

export function buildCertificationBank(
  language = "es"
) {
  const lang =
    language === "en"
      ? "en"
      : "es";

  const pageNames =
    Object.keys(
      PAGE_LABELS
    );

  const badOpen =
    lang === "es"
      ? "Aplicar de inmediato un descuento general sin revisar datos ni hacer preguntas."
      : "Immediately apply a broad discount without reviewing data or asking questions.";

  const badClose =
    lang === "es"
      ? "Cerrar el caso después de hacer el cambio sin verificar el resultado ni acordar seguimiento."
      : "Close the case after making the change without verifying the result or agreeing on follow-up.";

  const bank = [];

  const rotate =
    (
      index,
      offset
    ) =>
      CASES[
        (index + offset) %
        CASES.length
      ][lang];

  const shuffle =
    (
      items,
      seed
    ) => {
      const copy =
        [...items];

      let x =
        Math.abs(
          Number(
            seed
          ) ||
            1
        ) + 17;

      for (
        let i =
          copy.length -
          1;
        i >
        0;
        i--
      ) {
        x =
          (
            x *
              9301 +
            49297
          ) %
          233280;

        const j =
          Math.floor(
            (
              x /
              233280
            ) *
              (
                i +
                1
              )
          );

        [
          copy[i],
          copy[j]
        ] = [
          copy[j],
          copy[i]
        ];
      }

      return copy;
    };

  CASES.forEach(
    (
      item,
      index
    ) => {
      const c =
        item[lang];

      const module =
        moduleForCase(
          item.id
        );

      const q =
        (
          kind,
          skill,
          text,
          correct,
          distractors,
          explanation
        ) => {
          const options =
            shuffle(
              [
                {
                  id: "correct",
                  text: correct
                },
                {
                  id: "d1",
                  text:
                    distractors[0]
                },
                {
                  id: "d2",
                  text:
                    distractors[1]
                },
                {
                  id: "d3",
                  text:
                    distractors[2]
                }
              ],
              item.id *
                97 +
                bank.length *
                13
            );

          bank.push(
            {
              id:
                `case-${item.id}-${kind}`,

              caseId:
                item.id,

              moduleId:
                module.id,

              moduleTitle:
                module.title,

              skill,

              difficulty:
                item.difficulty,

              title:
                c.title,

              context:
                c.context,

              question:
                text,

              options,

              answer:
                "correct",

              explanation
            }
          );
        };

      q(
        "opening",
        "discovery",

        lang === "es"
          ? `En el caso “${c.title}”, ¿cuál es la mejor forma de iniciar la conversación?`
          : `In the “${c.title}” case, what is the best way to open the conversation?`,

        c.first,

        [
          rotate(
            index,
            5
          ).first,
          badOpen,
          rotate(
            index,
            11
          ).first
        ],

        lang === "es"
          ? "La mejor apertura reconoce la preocupación y busca datos antes de actuar."
          : "The strongest opening acknowledges the concern and discovers facts before acting."
      );

      q(
        "root",
        "rootCause",

        lang === "es"
          ? `¿Cuál es la causa raíz más probable en “${c.title}”?`
          : `What is the most likely root cause in “${c.title}”?`,

        c.root,

        [
          rotate(
            index,
            4
          ).root,
          rotate(
            index,
            9
          ).root,
          rotate(
            index,
            14
          ).root
        ],

        lang === "es"
          ? "La causa correcta conecta el síntoma con el proceso o dato real del negocio."
          : "The correct cause connects the symptom to the real business process or data."
      );

      const correctPage =
        item.pages[0];

      const wrongPages =
        pageNames.filter(
          p =>
            !item.pages.includes(
              p
            )
        );

      q(
        "navigation",
        "navigation",

        lang === "es"
          ? `¿Qué área del Portal deberías revisar primero para “${c.title}”?`
          : `Which Portal area should you review first for “${c.title}”?`,

        PAGE_LABELS[
          correctPage
        ][lang],

        [
          PAGE_LABELS[
            wrongPages[
              (index + 1) %
                wrongPages.length
            ]
          ][lang],

          PAGE_LABELS[
            wrongPages[
              (index + 3) %
                wrongPages.length
            ]
          ][lang],

          PAGE_LABELS[
            wrongPages[
              (index + 5) %
                wrongPages.length
            ]
          ][lang]
        ],

        lang === "es"
          ? "Esa área contiene la evidencia principal para tomar una decisión informada."
          : "That area contains the primary evidence needed for an informed decision."
      );

      q(
        "solution",
        "solution",

        lang === "es"
          ? `¿Cuál es la mejor solución para “${c.title}”?`
          : `What is the best solution for “${c.title}”?`,

        c.action,

        [
          rotate(
            index,
            6
          ).action,

          rotate(
            index,
            12
          ).action,

          badOpen
        ],

        lang === "es"
          ? "La solución correcta trata la causa raíz con un alcance controlado y medible."
          : "The correct solution addresses the root cause with controlled and measurable scope."
      );

      q(
        "close",
        "verification",

        lang === "es"
          ? `¿Cuál es el mejor cierre verificable para “${c.title}”?`
          : `What is the best verifiable close for “${c.title}”?`,

        c.close,

        [
          rotate(
            index,
            7
          ).close,

          badClose,

          rotate(
            index,
            15
          ).close
        ],

        lang === "es"
          ? "Un cierre sólido confirma el cambio, define métricas y establece seguimiento."
          : "A strong close confirms the change, defines metrics, and establishes follow-up."
      );
    }
  );

  return bank;
}

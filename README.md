# Portfolio libro — Paulina Fernández Hernández (2026)

Portafolio digital interactivo construido **exclusivamente con Next.js (App Router) + React + Framer Motion**. La experiencia es un catálogo abierto a doble página: no hay scroll vertical; se navega pasando hojas en 3D.

La landing muestra la referencia completa compartida en una tarjeta HD con animaciones suaves (auroras, destellos, flotación y brillo). El botón o un clic/arrastre horizontal gira la escena en 3D y revela el libro abierto. La portada ya no se repite dentro del libro: el contenido empieza directamente en el perfil.

## Ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para producción: `npm run build && npm start`.

## Navegación

- **Clic** en la página: pasa a la hoja siguiente; en el borde izquierdo, a la anterior.
- **Arrastre horizontal** sobre el libro.
- **Teclado**: `←` / `→`
- **Rueda del ratón** (cualquier dirección).
- **Controles visibles**: flechas anterior/siguiente, índice rápido por capítulos y numeración `01 / 04` (escritorio) o `01 / 08` (móvil).
- En pantallas ≤ 820 px el libro pasa a una sola hoja con transición 3D y los mismos controles. La secuencia incluye la contraportada inicial y la hoja de "Gracias", y no muestra el lomo negro.

## Arquitectura

```
app/
  layout.tsx          Fuentes (Outfit, Space Grotesk, Caveat, Montserrat) y globals.css
  page.tsx            Punto de entrada
  globals.css         Sistema visual completo (grid, degradados, pliegue, tipografía)
components/
  PortfolioExperience.tsx Control entre la landing y el libro
  HeroLanding.tsx     Portada inicial y transición al libro
  BookContainer.tsx   Estado, física de navegación, teclado/clic/drag/rueda, responsive
  PageSheet.tsx       Hoja 3D estática y hoja animada (rotateY + sombras dinámicas)
  BookControls.tsx    Flechas, índice rápido y contador
  PageRenderer.tsx    Selección de contenido por identificador de página
  TypewriterText.tsx  Efecto máquina de escribir con cursor lila/celeste
  pages/              AboutPage, StudiesPage, SkillsPage, ProjectsPage, ContactPage, guardas
  shared/             Avatar optimizado, DrippingTitle, CurvedArrow, HandNote, PageBase, ProjectCard
lib/profile.ts        TODO el texto editable (datos, estudios, skills, proyectos, enlaces)
public/portfolio-cover-hd.webp  Referencia ampliada y nitida usada en la landing
public/profile-avatar-hd.webp   Retrato ampliado y nitido usado en el perfil
```

### Cómo está montado el libro

Cada hoja física tiene una cara derecha (`front`) y una cara izquierda (`back`):

| Spread | Izquierda | Derecha |
| --- | --- | --- |
| 0 | Contraportada (`Flyleaf`) | Perfil |
| 1 | Formación | Habilidades |
| 2 | Proyectos I | Proyectos II |
| 3 | Contacto | Gracias |

La guarda inicial (`Flyleaf`) acompaña al perfil en el primer spread. Durante el giro se renderiza una hoja animada encima del stack; las capas base ya muestran el spread destino, por lo que la revelación es correcta en ambos sentidos. En móvil las ocho hojas se muestran de una en una, empezando por la contraportada.

## Personalización

Edita `lib/profile.ts` para cambiar nombre, correo, WhatsApp, enlaces, biografía, formación, tecnologías y proyectos. Añade cada carrera, certificación, curso o diplomado al arreglo `studies` indicando `category: "estudios"` o `category: "cursos"`; la hoja de formación lo mostrará en las pestañas superiores. Los colores y el grid viven en las variables de `app/globals.css` (`--petrol`, `--violet`, `--sky`, `--lilac`, `--pink`, `--gradient-text`).

### Formulario de contacto con Brevo

El formulario envía mensajes reales a través de la API SMTP de Brevo y el último spread del libro lo hace visible en escritorio (contacto + cierre).

1. Copia `.env.example` a `.env.local`.
2. Define `BREVO_API_KEY` con una clave API de Brevo con permisos de envío.
3. Verifica en Brevo el correo que usarás como remitente y configúralo en `BREVO_SENDER_EMAIL` (o deja el valor por defecto, `profile.email`).
4. Opcionalmente cambia `BREVO_TO_EMAIL` si quieres recibir los mensajes en otra dirección.
5. Reinicia `npm run dev`.

El envío pasa siempre por `app/api/contact/route.ts`, por lo que la clave API nunca llega al cliente. Cada mensaje llega a `BREVO_TO_EMAIL` con `reply-to` apuntando al visitante. Hay honeypot contra bots, validación de campos y un enlace `mailto:` como respaldo. Si falta la clave, el endpoint responde con un mensaje claro en español.

### Avatar

La página de perfil usa el avatar de `avatar.jpg` (el que coincide con la portada). Se guardó como `public/avatar-profile.webp` en **WebP sin pérdida y sin reescalado**: los píxeles son idénticos al original (solo se quitó el espacio vacío inferior). Está centrado en el marco. El archivo original sigue en la raíz del proyecto.

### Stack

Las tarjetas de habilidades tienen scroll propio cuando hay más contenido del que cabe, al igual que la página de formación. El contador de tecnologías se calcula desde `lib/profile.ts`, así que nunca queda desactualizado.

## Accesibilidad y rendimiento

- `prefers-reduced-motion` desactiva writing/transiciones largas.
- Controles con `aria-label`, índice con `role="tablist"` y navegación por teclado.
- Solo los componentes interactivos usan `"use client"`; tipografías optimizadas con `next/font`.
- Las ilustraciones y capturas de proyectos son SVG/CSS, sin dependencias de imágenes externas.

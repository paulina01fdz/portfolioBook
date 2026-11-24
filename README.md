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
- **Controles visibles**: flechas anterior/siguiente, índice rápido por capítulos y numeración `01 / 03` (escritorio) o `01 / 06` (móvil).
- En pantallas ≤ 820 px el libro pasa a una sola hoja con transición 3D y los mismos controles.

## Arquitectura

```
app/
  layout.tsx          Fuentes (Outfit, Space Grotesk, Caveat) y globals.css
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

| Hoja | Derecha | Izquierda al girar |
| --- | --- | --- |
| 0 | Perfil | Formación |
| 1 | Habilidades | Proyectos I |
| 2 | Proyectos II | Contacto |

La guarda inicial (`Flyleaf`) acompaña al perfil en el primer spread. Durante el giro se renderiza una hoja animada encima del stack; las capas base ya muestran el spread destino, por lo que la revelación es correcta en ambos sentidos.

## Personalización

Edita `lib/profile.ts` para cambiar nombre, correo, WhatsApp, enlaces, biografía, formación, tecnologías y proyectos. Añade cada carrera, certificación, curso o diplomado al arreglo `studies`. Los colores y el grid viven en las variables de `app/globals.css` (`--petrol`, `--violet`, `--sky`, `--lilac`, `--pink`, `--gradient-text`).

### Formulario de contacto real

El formulario envía mensajes de verdad y el último spread del libro lo hace visible en escritorio (contacto + cierre).

- **Por defecto:** usa [FormSubmit](https://formsubmit.co) con `profile.email`. No requiere claves ni variables de entorno. La primera vez que alguien envíe un mensaje, FormSubmit enviará un correo de activación a `fpaulina545@gmail.com`; haz clic en ese enlace una sola vez para activar el envío.
- **Opcional:** si prefieres Formspree, copia `.env.example` a `.env.local` y define `FORMSPREE_ENDPOINT=https://formspree.io/f/TU_FORM_ID`. Reinicia `npm run dev`.

El envío siempre pasa por `app/api/contact/route.ts`, por lo que el endpoint no queda expuesto en el cliente. Hay honeypot contra bots y un enlace directo de correo como respaldo.

### Avatar

La página de perfil usa el avatar de `avatar.jpg` (el que coincide con la portada). Se guardó como `public/avatar-profile.webp` en **WebP sin pérdida y sin reescalado**: los píxeles son idénticos al original (solo se quitó el espacio vacío inferior). Está centrado en el marco. El archivo original sigue en la raíz del proyecto.

### Stack

Las tarjetas de habilidades tienen scroll propio cuando hay más contenido del que cabe, al igual que la página de formación. El contador de tecnologías se calcula desde `lib/profile.ts`, así que nunca queda desactualizado.

## Accesibilidad y rendimiento

- `prefers-reduced-motion` desactiva writing/transiciones largas.
- Controles con `aria-label`, índice con `role="tablist"` y navegación por teclado.
- Solo los componentes interactivos usan `"use client"`; tipografías optimizadas con `next/font`.
- Las ilustraciones y capturas de proyectos son SVG/CSS, sin dependencias de imágenes externas.

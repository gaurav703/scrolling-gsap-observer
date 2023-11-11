"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.js</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore starter templates for Next.js.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   )
// }

//// horizontal scroll using gsap-observer
const Section = ({ title, className, bgUrl }) => {
  return (
    <section className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div
            className="background"
            style={{ backgroundImage: `url(${bgUrl})` }}
          >
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;

    function adjustTilt(e) {
      let width = header.offsetWidth;
      let mouseX = e.clientX;
      let rotationY = 20 * (mouseX / width - 0.5);
      header.style.transform = `rotateY(${rotationY}deg)`;
    }

    function handleHeaderClick() {
      header.style.opacity = "0";
      setTimeout(() => {
        header.classList.add("clicked");
        header.style.opacity = "1";
      }, 500);
      setTimeout(() => {
        header.classList.remove("clicked");
      }, 1500);
    }

    header.addEventListener("mousemove", adjustTilt);
    header.addEventListener("click", handleHeaderClick);

    return () => {
      header.removeEventListener("mousemove", adjustTilt);
      header.removeEventListener("click", handleHeaderClick);
    };
  }, []);

  useEffect(() => {
    let sections = document.querySelectorAll(".section"),
      lastTap = 0,
      images = document.querySelectorAll(".background"),
      headings = document.querySelectorAll(".section-title"),
      outerWrappers = document.querySelectorAll(".wrapper-outer"),
      innerWrappers = document.querySelectorAll(".wrapper-inner"),
      currentIndex = 1,
      wrap = (index, max) => (index + max) % max,
      animating;

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });

    // gsap.set(outerWrappers, { xPercent: 100 });
    // gsap.set(innerWrappers, { xPercent: -100 });

    function gotoSection(index, direction) {
      index = wrap(index, sections.length);
      animating = true;

      let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        // tl = gsap.timeline({
        //   defaults: { duration: 1.25, ease: "power1.inOut" },
        //   onComplete: () => (animating = false),
        // });

        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => {
            animating = false;
          },
        });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { xPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { xPercent: 0 },
        0
      )
        .fromTo(images[index], { xPercent: 15 * dFactor }, { xPercent: 0 }, 0)
        .fromTo(
          headings[index],
          {
            // autoAlpha: 0,
            // // xPercent: 150 * dFactor,
            // xPercent: -30 * direction,

            "--width": 800,
            xPercent: 30 * direction,
          },
          {
            // autoAlpha: 1,
            // xPercent: 0,
            // duration: 1,
            // ease: "power2",
            // xPercent: 0 * direction,
            // stagger: {
            //   each: 0.02,
            //   from: "random",
            // },
            "--width": 200,
            xPercent: 0,
          },
          0.2
        );

      currentIndex = index;
    }

    function handleTap(event) {
      let currentTime = new Date().getTime();
      let tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        if (!animating) {
          gotoSection(currentIndex + 1, 1);
        }
      }
      lastTap = currentTime;
    }

    sections.forEach((section) => {
      section.addEventListener("touchend", handleTap);
    });

    window.addEventListener("wheel", (event) => {
      if (event.deltaY < 0 && !animating) {
        gotoSection(currentIndex - 1, -1);
      } else if (event.deltaY > 0 && !animating) {
        gotoSection(currentIndex + 1, 1);
      }
    });

    gotoSection(0, 1);
  }, []);
  return (
    <div className="app-container">
      <header ref={headerRef} className="header">
        <div>The cycle of love</div>
        <div>A life worth living</div>
      </header>
      <Section
        title="Connected Souls"
        className="first"
        bgUrl="https://images.unsplash.com/photo-1494403687614-8ca3e13f154f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2ODk5OTV8&ixlib=rb-4.0.3&q=85"
      />
      <Section
        title="Traveling"
        className="second"
        bgUrl="https://images.unsplash.com/photo-1579786695384-b75487cd0411?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTAxNjR8&ixlib=rb-4.0.3&q=85"
      />
      <Section
        title="Making Memories"
        className="third"
        bgUrl="https://images.unsplash.com/photo-1514770643069-54183731a981?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTAyODJ8&ixlib=rb-4.0.3&q=85"
      />
      <Section
        title="Real experiences"
        className="fourth"
        bgUrl="https://images.unsplash.com/photo-1503516459261-40c66117780a?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTAzNDZ8&ixlib=rb-4.0.3&q=85"
      />
      <Section
        title="A Shared Lifetime"
        className="fifth"
        bgUrl="https://images.unsplash.com/photo-1645374499341-972cc5959a27?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg2OTA1NDd8&ixlib=rb-4.0.3&q=85"
      />
    </div>
  );
};
export default App;

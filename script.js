/* =========================================================
   DAILY VERSE - SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const startScreen =
        document.getElementById("start-screen");

    const verseScreen =
        document.getElementById("verse-screen");

    const tapMessage =
        document.getElementById("tap-message");

    const tamilReference =
        document.getElementById("tamilReference");

    const tamilVerse =
        document.getElementById("tamilVerse");

    const englishReference =
        document.getElementById("englishReference");

    const englishVerse =
        document.getElementById("englishVerse");

    const amenBtn =
        document.getElementById("amenBtn");

    const blessing =
        document.getElementById("blessing");

    const heartContainer =
        document.getElementById("heart-container");

    const sparkleContainer =
        document.getElementById("sparkle-container");

    const amenFlashContainer =
        document.getElementById("amen-flash-container");

    const goldenGlow =
        document.getElementById("golden-glow");


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (!startScreen || !verseScreen) {

        console.error(
            "Daily Verse: required elements are missing."
        );

        return;
    }


    /* =====================================================
       LOAD VERSE
    ===================================================== */

    const verseData =
        typeof selectedVerse !== "undefined"
            ? selectedVerse
            : null;


    if (!verseData) {

        console.error(
            "Daily Verse: selectedVerse not found."
        );

        return;
    }


    /* =====================================================
       DISPLAY VERSE
    ===================================================== */

    if (tamilReference) {

        tamilReference.textContent =
            verseData.reference || "";
    }


    if (tamilVerse) {

        tamilVerse.textContent =
            verseData.verse || "";
    }


    if (englishReference) {

        englishReference.textContent =
            verseData.englishReference || "";
    }


    if (englishVerse) {

        englishVerse.textContent =
            verseData.englishVerse || "";
    }


    /* =====================================================
       PAGE STATE
    ===================================================== */

    let verseShown = false;


    /* =====================================================
       GOLDEN GLOW
    ===================================================== */

    function showGoldenGlow() {

        if (!goldenGlow) return;

        goldenGlow.classList.remove("active");

        void goldenGlow.offsetWidth;

        goldenGlow.classList.add("active");
    }


    /* =====================================================
       BOTTOM -> TOP FLOATING ICON
    ===================================================== */

    function createFloatingIcon() {

        if (!heartContainer) return;


        const icon =
            document.createElement("div");


        icon.className =
            "floating-heart";


        const icons = [


            "✨",
            "🕊️",
            "🌸",
            "🌟"

        ];


        icon.textContent =
            icons[
                Math.floor(
                    Math.random() *
                    icons.length
                )
            ];


        /* Random horizontal position */

        icon.style.left =
            `${Math.random() * 100}vw`;


        /* Random size */

        icon.style.fontSize =
            `${18 + Math.random() * 20}px`;


        /* Random speed */

        icon.style.animationDuration =
            `${4.5 + Math.random() * 3}s`;


        heartContainer.appendChild(icon);


        /* Remove after animation */

        icon.addEventListener(
            "animationend",
            () => icon.remove(),
            { once: true }
        );
    }


    /* =====================================================
       START FLOATING ICONS
    ===================================================== */

    function startFloatingIcons(
        amount = 20
    ) {

        if (!heartContainer) return;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                createFloatingIcon,
                i * 90
            );
        }
    }


    /* =====================================================
       CREATE SPARKLE
    ===================================================== */

    function createSparkle() {

        if (!sparkleContainer) return;


        const spark =
            document.createElement("span");


        spark.className =
            "spark";


        const size =
            4 + Math.random() * 8;


        spark.style.left =
            `${Math.random() * 100}vw`;


        spark.style.top =
            `${35 + Math.random() * 55}vh`;


        spark.style.width =
            `${size}px`;


        spark.style.height =
            `${size}px`;


        sparkleContainer.appendChild(spark);


        spark.addEventListener(
            "animationend",
            () => spark.remove(),
            { once: true }
        );
    }


    /* =====================================================
       START SPARKLES
    ===================================================== */

    function startSparkles(
        amount = 25
    ) {

        if (!sparkleContainer) return;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                createSparkle,
                i * 70
            );
        }
    }


    /* =====================================================
       AMEN CENTER FLASH
       50% OPACITY
    ===================================================== */

    function createAmenFlash() {

        if (!amenFlashContainer) return;


        const icons = [

            "❤️",
            "✨",
            "🕊️",
            "🌟",
            "💛"

        ];


        for (
            let i = 0;
            i < 18;
            i++
        ) {


            const icon =
                document.createElement("span");


            icon.className =
                "amen-flash-icon";


            /* Random direction */

            const angle =
                Math.random() *
                Math.PI *
                2;


            /* Random distance */

            const distance =
                80 +
                Math.random() *
                170;


            /* Icon */

            icon.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];


            /* X */

            icon.style.setProperty(
                "--x",
                `${Math.cos(angle) * distance}px`
            );


            /* Y */

            icon.style.setProperty(
                "--y",
                `${Math.sin(angle) * distance}px`
            );


            /* Scale */

            icon.style.setProperty(
                "--scale",
                `${0.75 + Math.random() * 0.55}`
            );


            amenFlashContainer.appendChild(
                icon
            );


            icon.addEventListener(
                "animationend",
                () => icon.remove(),
                { once: true }
            );
        }
    }


    /* =====================================================
       SHOW VERSE SCREEN
    ===================================================== */

    function revealVerse() {

        if (verseShown) return;


        verseShown = true;


        /* Hide first screen */

        startScreen.classList.remove(
            "active"
        );


        /* Show verse screen */

        verseScreen.classList.add(
            "active"
        );


        /* Blessing */

        if (blessing) {

            blessing.classList.add(
                "show"
            );
        }


        /* Effects */

        showGoldenGlow();

        startFloatingIcons(30);

        startSparkles(40);


        setTimeout(
            showGoldenGlow,
            300
        );
    }


    /* =====================================================
       TAP SCREEN
    ===================================================== */

    if (tapMessage) {

        tapMessage.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                revealVerse();
            }
        );
    }


    /* =====================================================
       CLICK ANYWHERE ON FIRST PAGE
    ===================================================== */

    startScreen.addEventListener(
        "click",
        () => {

            revealVerse();
        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (

                (
                    event.key === "Enter" ||
                    event.key === " "
                )

                &&

                !verseShown

                &&

                startScreen.classList.contains(
                    "active"
                )

            ) {

                event.preventDefault();

                revealVerse();
            }
        }
    );


    /* =====================================================
       AMEN BUTTON
    ===================================================== */

    if (amenBtn) {

        amenBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                /* Center golden flash */

                showGoldenGlow();


                /* Icons start from center */

                createAmenFlash();


                /* Bottom-to-top icons */

                startFloatingIcons(18);


                /* Sparkles */

                startSparkles(22);


                /* Button animation */

                amenBtn.classList.remove(
                    "amen-active"
                );


                void amenBtn.offsetWidth;


                amenBtn.classList.add(
                    "amen-active"
                );
            }
        );
    }


    /* =====================================================
       FINISHED
    ===================================================== */

    console.log(
        "Daily Verse loaded:",
        verseData.reference
    );

});
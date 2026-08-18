async function recordAmen(
    verseDate,
    verseReference
) {

    let userId =
        localStorage.getItem("daily_verses_user_id");

    if (!userId) {

        userId =
            crypto.randomUUID();

        localStorage.setItem(
            "daily_verses_user_id",
            userId
        );
    }

    const response =
        await fetch("/api/amen", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user_id: userId,

                verse_date: verseDate,

                verse_reference: verseReference

            })

        });

    const result =
        await response.json();

    if (!response.ok) {

        throw new Error(
            result.message ||
            "Amen failed"
        );

    }

    return result;
}

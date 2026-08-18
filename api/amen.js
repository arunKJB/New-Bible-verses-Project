import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {

        const {
            user_id,
            verse_date,
            verse_reference
        } = req.body;

        if (
            !user_id ||
            !verse_date ||
            !verse_reference
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required information"
            });
        }

        const { error: eventError } = await supabase
            .from("amen_events")
            .insert({
                user_id: user_id,
                verse_date: verse_date,
                verse_reference: verse_reference
            });

        if (eventError) {
            console.error(eventError);

            return res.status(500).json({
                success: false,
                message: "Could not record Amen event"
            });
        }

        const { data, error: countError } = await supabase
            .rpc("increment_amen_count", {
                p_date: verse_date,
                p_reference: verse_reference
            });

        if (countError) {
            console.error(countError);

            return res.status(500).json({
                success: false,
                message: "Could not update Amen count"
            });
        }

        return res.status(200).json({
            success: true,
            amen_count: data
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

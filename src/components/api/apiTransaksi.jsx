
import supabase from "../../supabaseClient";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { user_id, items, total } = req.body;

        const { data, error } = await supabase
            .from('tbl_transaksi')
            .insert([
                {
                    user_id,
                    items,
                    total,
                    tgl_transaksi: new Date().toISOString()
                }
            ]);

        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json({ data });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
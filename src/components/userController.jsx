import supabase from "../supabaseClient";

export const fetchUserData = async (ID_user) =>{
    const {data, error} = await supabase.from('tbl_users').select('*').eq('ID_user', ID_user).single();
    if(error){
        console.error('Error fetching user data:', error);
        return null;
    }

    return data;
 
}

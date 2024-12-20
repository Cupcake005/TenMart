import supabase from "../supabaseClient";



export async function loginUser(identifier, password) {
    let query;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  
    if (isEmail) {
      query =  supabase.from('tbl_users').select('*').eq('email', identifier).single();
    } else {
      query =  supabase.from('tbl_users').select('*').eq('NoHP', identifier).single();
    }
  
    const { data: user, error } =await query;
  
    if (error || !user) {
      return {
        success: false,
        message: isEmail ? 'Email tidak ditemukan' : 'No HP tidak ditemukan',
      };
    }
  
   
    if (user.password !== password) {
      return {
        success: false,
        message: "Password salah.",
      };
    }
  
    
    return {
      success: true,
      message: "Login berhasil",
      user: {
        ID_user: user.ID_user,
        nama_pelanggan: user.nama_pelanggan,
        email: user.email,
        NoHP: user.NoHP,
      },
    };
  }
  
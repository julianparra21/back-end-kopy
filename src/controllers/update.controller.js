import pool from '../db.js';


//update domiliario
export const updateDomiciliarioGet = (req, res) => {
    res.send("Actualizar Domiciliario")
}

export const updateDomiciliarioPost = async (req, res) => {
    const {email,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE domiciliario SET email=?,telefono=? WHERE id_domiciliario=?`, [email,telefono]);
        res.status(200).json({ message: 'Domiciliario actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}

//update admin
export const updateAdminGet = (req, res) => {
    res.send("Actualizar Admin")
}

export const updateAdminPost = async (req, res) => {
    const {email,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE admin SET email=?,telefono=? WHERE id_admin=?`, [email,telefono]);
        res.status(200).json({ message: 'Admin actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar Administrador' });

    }
}

//update usuario
export const updateUsuarioGet = (req, res) => {
    res.send("Actualizar Usuario")
}

export const updateUsuarioPost = async (req, res) => {
    const {email,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE usuario SET email=?,telefono=? WHERE id_usuario=?`, [email,telefono]);
        res.status(200).json({ message: 'Usuario actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar Usuario' });

    }
}


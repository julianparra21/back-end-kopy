
import nodemailer from "nodemailer";




export const updateDomiciliario = (req, res) => {
    res.send("Actualizar Domiciliario")
}

export const updateDomiciliariop = async (req, res) => {
    const {email,password,telefono}=req.body;

    try {
        const [rows] = await pool.query(`UPDATE domiciliario SET email=?,password=?,telefono=? WHERE id_domiciliario=?`, [email,password,telefono]);
        res.status(200).json({ message: 'Domiciliario actualizado correctamente' });

        
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
}

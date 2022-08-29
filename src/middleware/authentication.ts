import jwt from 'jsonwebtoken';

let role: any;

export const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ respuesta: "No tiene un token valido" });
  const token = authHeader && authHeader.split(' ')[1];
  try {
    jwt.verify(token, 'clavesupersecretagg');
    const decoded: any = jwt.decode(token);
    role = decoded.usuarioRol;
    next();
  } catch (error) {
    return res.status(401).json({ respuesta: "No autorizado" });
  }
}

export const isAdmin = async (_req: any, res: any, next: any) => {
  try {
    if (role === 'Administrador') {
      next();
    } else return res.status(403).json({ respuesta: "No es Administrador" });
  } catch (error) {
    return res.status(500).json({ respuesta: "Error en la peticion" });
  }
};

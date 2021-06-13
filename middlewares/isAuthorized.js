const isAuthorized = (handler) => (req, res) => {
    const { isAdmin, isOwner } = res.locals;

   const {method} = req

   
   // authorize if admin or owner

    if (isAdmin || isOwner ) return handler(req, res);

  
    return res.status(403).send({ message: "Unauthorized" });
};

export default isAuthorized;

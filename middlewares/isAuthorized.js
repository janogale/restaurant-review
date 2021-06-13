const isAuthorized = (handler) => (req, res) => {
    const { isAdmin, isOwner, email } = res.locals;

   const {method} = req

   

   // super user
   if(email ==='admin@gmail.com' && isAdmin)  return handler(req, res);
   
   // authorize if admin or owner
    if (isAdmin || isOwner ) return handler(req, res);

  // normal users are allowed to read or create new restuarant or review
    if(method ==='GET' || method === 'POST') return handler(req, res);

    return res.status(403).send({ message: "Unauthorized" });
};

export default isAuthorized;

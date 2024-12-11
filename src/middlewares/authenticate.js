// import

export const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader);
}

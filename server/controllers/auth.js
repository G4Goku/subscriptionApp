export const register = (req, res) => {
console.log(req.body)
try {
  const {name,password}=req.body
  if(!name){
    return res.json({
      error:"name required"
    })
  }
  if(!password || password.length < 6){
    return res.json({
      error:"password is required and should be 6 characters long"
    })
  }
  return res.json({
    data:"this is result"
  })
} catch (error) {
  console.log(error)
}
};

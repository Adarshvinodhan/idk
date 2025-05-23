import { UserDetails } from "../models/userModel.js";

export const addUserDetails = async (req, res) => {
  const userId = req.params.id;
  const { age, height, weight, location, phone } = req.body;

  const img = req.file?.path; // cloudinary URL

  try {
    let userDetails = await UserDetails.findOne({ where: { userId } });

    if (userDetails) {
      await userDetails.update({ age, height, weight, location, phone, img });
    } else {
      userDetails = await UserDetails.create({
        userId,
        age,
        height,
        weight,
        location,
        phone,
        img,
      });
    }

    res.status(200).json({ message: 'User details saved', userDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getUserDetails = async(req,res)=>{
    const userId = req.params.id;
  try{
      const userDetails = await UserDetails.findOne({where:{userId}})
      if(userDetails){
        return res.status(200).json({userDetails})
      }
      else{
        return res.status(400).json("User details not Found")
      }
  }catch(err){
    return res.status(500).json(err)
  }
}

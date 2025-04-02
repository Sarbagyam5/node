
const formatedUser = (data) => {
  return {
    id: data._id,
    name: data.name,
    address: data.address,
    gender: data.gender,
    dob: data.dob,
    email: data.email,
    role: data.role,
    imgUrl: data.profileImageUrl,
  }
}

export default formatedUser
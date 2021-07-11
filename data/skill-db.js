export { 
	find,
    findById,
    create,
    findByIdAndDelete
}

const skills = [
  {text: 'Java', learned: true, _id: 125223},
  {text: 'Node', learned: true, _id: 127904},
  {text: 'Ruby on rails', learned: false, _id: 139608},
]

function create(skill, callback) {
    // Add the id
    skill._id = Date.now() % 1000000
    // New skills wouldn't be done
    skill.done = false
    skills.push(skill)
    return callback(null, skill)
}

const find = (conditions, callback) => {
  // see if this works, if not, execute the code in the catch block
  try {
    // make sure that conditions is an object - if not throw a TypeError
    if (!(conditions instanceof Object)){
      throw new TypeError('Please pass in an object')
    }
    let conditionKeys = Object.keys(conditions)
    // If the object is empty, return all the skills
    if (conditionKeys.length === 0) return callback(null, skills)
    // make sure that all the properties on the conditions exists on the object
    if (!conditionKeys.every((i) => Object.keys(skills[0]).includes(i))) {
      throw new Error('Must find by properties that exist on the array items')
    } else {
			// Finally actually find what we're looking for
      return callback(null, skills.filter((skill) =>
        conditionKeys.every((propKey) => skill[propKey] === conditions[propKey])
      ))
    }
	// deal with errors
  } catch (error) {
    console.log(error)
    callback(error, [])
  }
}

const findById = (id, callback) =>{
    try {
      const skill = skills.find(skill => skill._id === parseInt(id))
      if (!skill) throw new Error ('No skill was found')
      return callback(null, skill)
    } catch (error) {
      console.log(error)
      return callback(error, null)
    }
}

function findByIdAndDelete(id, callback) {
    try { 
      // Find the index based on the _id of the skill object
      const idx = skills.findIndex(skill => skill._id == parseInt(id))
      const deletedskill = skills.splice(idx, 1)
      if (!deletedskill.length ) throw new Error ('No skill was deleted')
      return callback(null, deletedskill[0])
    } catch(error) {
      return callback(error, null)
    }
}
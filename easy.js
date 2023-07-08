const easyQuestions = {
  bake: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bake--_gb_1.mp3',
  must: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/must--_gb_1.mp3',
  fried: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fried--_gb_1.mp3',
  sea: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sea--_gb_1.mp3',
  chase: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/chase--_gb_1.mp3',
  bee: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bee--_gb_1.mp3',
  seven: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/seven--_gb_1.mp3',
  count: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/count--_gb_1.mp3',
  write: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/write--_gb_1.mp3',
  steer: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/steer--_gb_1.mp3',
  tenth: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/tenth--_gb_1.mp3',
  they: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/they--_gb_1.mp3',
  fight: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fight--_gb_1.mp3',
  birthday: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/birthday--_gb_1.mp3',
  dracula: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dracula--_gb_1.mp3',
  swan: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/swan--_gb_1.mp3',
  different: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/different--_gb_1.mp3',
  language: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/language--_gb_1.mp3',
  mammal: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/mammal--_gb_1.mp3',
  dessert: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dessert--_gb_1.mp3',
  favorite: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/favorite--_gb_1.mp3',
  stomach: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/stomach--_gb_1.mp3',
  probably: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/probably--_gb_1.mp3',
  neither: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/neither--_gb_1.mp3',
  numeral: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/numeral--_gb_1.mp3',
  million: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/million--_gb_1.mp3',
  message: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/message--_gb_1.mp3',
  except: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/except--_gb_1.mp3',
  laughter: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/laughter--_gb_1.mp3',
}

const easyHints = {
  bake: 'to cook by dry heat in an oven or on heated metal or stones',
  must: 'to be obliged or bound to by an imperative requirement',
  fried: 'cooked in a pan or on a griddle over direct heat, usually in fat or oil',
  sea: 'the salt waters that cover the greater part of the earth surface',
  chase: 'to pursue in order to seize, overtake, etc.',
  bee: 'any hymenopterous insect of the superfamily Apoidea, including social and solitary species of several families',
  seven: 'a symbol for this number, VII',
  count: 'to check over (the separate units or groups of a collection) one by one; to determine the total number; add up',
  write: 'to trace or form (characters, letters, words, etc.) on the surface of some material, as with a pen, pencil, or other instrument or means',
  steer: 'to guide the course of (something in motion) by a rudder, helm, wheel, etc.',
  tenth: 'constituting number ten in a sequence',
  they: 'nominative plural of he, she, and it',
  fight: 'a battle or combat; struggle',
  birthday: 'a day of a person birth',
  dracula: 'the devil; son of Dracul',
  swan: 'any of several large, stately aquatic birds of the subfamily Anserinae, having a long, slender neck and usually pure-white plumage in the adult',
  different: 'not alike in character or quality; distinct in nature; dissimilar',
  language: 'the principal method of human communication, consisting of words used in a structured and conventional way and conveyed by speech, writing, or gesture',
  mammal: 'having the body more or less covered with hair, nourishing the young with milk from the mammary glands, and, with the exception of the egg-laying monotremes, giving birth to live young',
  dessert: 'cake, pie, fruit, pudding, ice cream, etc., served as the final course of a meal',
  favorite: 'a person or thing regarded with special favor or preference',
  stomach: 'a saclike enlargement of the alimentary canal, as in humans and certain animals, forming an organ for storing, diluting, and digesting food',
  probably: 'almost certainly; as far as one knows or can tell',
  neither: 'not the one nor the other; not either',
  numeral: 'a word, letter, symbol, or figure, etc., expressing a number; number',
  million: 'the number equivalent to the product of a thousand and a thousand; 1,000,000',
  message: 'a communication containing some information, news, advice, request, or the like, sent by messenger, telephone, email, or other means',
  except: 'with the exclusion of; not including; other than',
  laughter: 'the action or sound of laughing',
}

const wrapper = document.getElementById('wrapper')
const main = document.getElementById('main')
const difficulty = document.getElementById('difficulty')
const audioSource = document.getElementById('audioSource')
const input = document.getElementById('answers')
const hintWrap = document.getElementById('hintWrap')
const hintButton = document.getElementById('hint')
const hint = document.getElementById('showHint')
const scoreInfo = document.getElementById('scoreInfo')
let isLookAtHint = false

const { values, keys } = Object
let audio
let currentQuestion = ''
let answers = ''
let diff = ''
let page = 1
let score = 0
const answered = []

// for the begining
wrapper.removeChild(main)

/**
 * Handling easy button click
 */
const handleEasyBtn = () => {
  wrapper.removeChild(difficulty)
  wrapper.append(main)
  diff = 'easy'
  runQuiz()
}

/**
 * Handling show hint
 */
const showHint = () => {
  isLookAtHint = true
  hintWrapper.removeChild(hintButton)
  switch(diff) {
    case 'easy': hint.innerHTML = `<b>Hint:</b> ${easyHints[currentQuestion]}`
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  scoreInfo.innerText = `Your Score: ${score}`
  switch(diff) {
    case 'easy': {
      currentQuestion = keys(easyQuestions)[question]
    }
  }
}

const random = () => {
  return Math.floor(Math.random() * keys(easyQuestions).length)
}
/**
 * Handling get question by difficulty
 * @returns {number}
 */
const getDifficultyQuestion = () => {
  let idx = random()

  // Filtering is the current question has passed yet
  const filterQuestion = answered.find(index => index === idx)
  if (page > 1 && filterQuestion !== undefined) {
    idx = random()
  }
  answered.push(idx)
  console.log(answered)

  switch(diff) {
    case 'easy': {
      audio = new Audio(values(easyQuestions)[idx])
    }
  }

  return idx
}

/**
 * Handle play audio
 */
const playAudio = () => {
  audio.play()
}

/**
 * To handle on change
 * @param {Event} e
 */
const handleChange = (e) => {
  answers = e.target.value
}

/**
 * Handling submit
 * @param {Event} e
 */
const handleSubmit = (e) => {
  e.preventDefault()
  if (page <= 10) {
    if (answers.toLowerCase() === currentQuestion.toLowerCase()) {
      alert('Correct!')
      score += 10
    } else {
      alert('Try again!')
    }

    input.value = ''

    page++
    runQuiz()
    console.log(page, `Hasil score: ${score}`)
  }
}

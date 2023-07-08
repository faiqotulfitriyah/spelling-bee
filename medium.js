const mediumQuestions = {
 	bough:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/bough--_gb_1.mp3',
  	adequate:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/adequate--_gb_1.mp3',
  	denominator:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/denominator--_gb_1.mp3',
  	descendant:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/descendant--_gb_1.mp3',
  	peculiar:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/peculiar--_gb_1.mp3',
  	faucet:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/faucet--_gb_1.mp3',
  	halves:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/halves--_gb_1.mp3',
  	hyphen:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hyphen--_gb_1.mp3',
  	freight:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/freight--_gb_1.mp3',
  	rural:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/rural--_gb_1.mp3',
  	squawk:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/squawk--_gb_1.mp3',
  	sought:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sought--_gb_1.mp3',
  	fathom:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fathom--_gb_1.mp3',
  	pique:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/pique--_gb_1.mp3',
  	feud:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/feud--_gb_1.mp3',
  	annihilate:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/annihilate--_gb_1.mp3',
  	reprimand:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/reprimand--_gb_1.mp3',
  	homage:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/homage--_gb_1.mp3',
  	lofty:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/lofty--_gb_1.mp3',
  	simultaneously:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/simultaneously--_gb_1.mp3',
  	vicious:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/vicious--_gb_1.mp3',
  	detach:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/detach--_gb_1.mp3',
  	notorious:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/notorious--_gb_1.mp3',
  	rupture:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/rupture--_gb_1.mp3',
  	grimy:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/grimy--_gb_1.mp3',
}

const mediumHints = {
  bough:'a main branch of a tree',
  adequate:'satisfactory or acceptable in quality or quantity',
  denominator:'the number below the line in a common fraction; a divisor',
  descendant:'a person, plant, or animal that is descended from a particular ancestor',
  peculiar:'strange or odd; unusual',
  faucet:'a fixture for drawing or regulating the flow of liquid especially from a pipe',
  halves:'to divide (something) into two equal parts : to divide (something) into halves. : to reduce (something) to one half of the original amount or size',
  hyphen:'is a punctuation mark used to join words and to separate syllables of a single word',
  freight:'goods or cargo carried by a ship, train, truck, or airplane',
  rural:'in, relating to, or characteristic of the countryside rather than the town',
  squawk:'a loud, harsh, or discordant noise made by a bird or a person',
  sought:'past tense and past participle of SEEK',
  fathom:'a unit of length equal to six feet (approximately 1.8 m), chiefly used in reference to the depth of water',
  pique:'a feeling of irritation or resentment resulting from a slight, especially to one\'s pride',
  feud:'a prolonged and bitter quarrel or dispute',
  annihilate:'destroy utterly; obliterate',
  reprimand:'a rebuke, especially an official one',
  homage:'special honor or respect shown publicly',
  lofty:'of imposing height',
  simultaneously:'at the same time',
  vicious:'deliberately cruel or violent',
  detach:'disengage (something or part of something) and remove it',
  notorious:'famous or well known, typically for some bad quality or deed',
  rupture:'an instance of breaking or bursting suddenly and completely',
  grimy:'covered with or characterized by grime',
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
const handleMediumBtn = () => {
  wrapper.removeChild(difficulty)
  wrapper.append(main)
  diff = 'medium'
  runQuiz()
}

/**
 * Handling show hint
 */
const showHint = () => {
  isLookAtHint = true
  hintWrapper.removeChild(hintButton)
  switch(diff) {
    case 'medium': hint.innerHTML = `<b>Hint:</b> ${mediumHints[currentQuestion]}`
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  scoreInfo.innerText = `Your Score: ${score}`
  switch(diff) {
    case 'medium': {
      currentQuestion = keys(mediumQuestions)[question]
    }
  }
}

const random = () => {
  return Math.floor(Math.random() * keys(mediumQuestions).length)
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
    case 'medium': {
      audio = new Audio(values(mediumQuestions)[idx])
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

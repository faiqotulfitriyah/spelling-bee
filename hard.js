const hardQuestions = {
 	schism:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/schism--_gb_1.mp3',
    reverberate: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/reverberate--_gb_1.mp3',
    erroneous:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/erroneous--_gb_1.mp3',
    chagrin:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/chagrin--_gb_1.mp3',
    grotesque:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/grotesque--_gb_1.mp3',
    undernourished:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/undernourished--_gb_1.mp3',
    facsimile:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/facsimile--_gb_1.mp3',
    succint:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/succint--_gb_1.mp3',
    stringent:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/stringent--_gb_1.mp3',
    soliloquy:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/soliloquy--_gb_1.mp3',
    lackadaisical:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/lackadaisical--_gb_1.mp3',
    fluorescent:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/fluorescent--_gb_1.mp3',
    baccalaureate:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/baccalaureate--_gb_1.mp3',
    resuscitate:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/resuscitate--_gb_1.mp3',
    diptych:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/diptych--_gb_1.mp3',
    calamitous:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/calamitous--_gb_1.mp3',
    eulogize:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/eulogize--_gb_1.mp3',
    onomatopeia:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/onomatopeia--_gb_1.mp3',
    matinee:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/matinee--_gb_1.mp3',
    sleaze:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sleaze--_gb_1.mp3',
    insurmountable:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/insurmountable--_gb_1.mp3',
    poignancy:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/poignancy--_gb_1.mp3',
    otorhinolaryngologist:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/otorhinolaryngologist--_gb_1.mp3',
    demagogue:'https://ssl.gstatic.com/dictionary/static/sounds/oxford/demagogue--_gb_1.mp3',
}

const hardHints = {
    schism:'a split or division between strongly opposed sections or parties, caused by differences in opinion or belief',
    reverberate: '(of a loud noise) be repeated several times as an echo',
    erroneous:'wrong;incorrect',
    chagrin:'distress or embarrassment at having failed or been humiliated',
    grotesque:'comically or repulsively ugly or distorted',
    undernourished:'having insufficient food or other substances for good health and condition',
    facsimile:'an exact copy, especially of written or printed material',
    succint:'(especially of something written or spoken) briefly and clearly expressed',
    stringent:'(of regulations, requirements, or conditions) strict, precise, and exacting',
    soliloquy:'an act of speaking one\'s thoughts aloud when by oneself or regardless of any hearers, especially by a character in a play',
    lackadaisical:'lacking enthusiasm and determination; carelessly lazy',
    fluorescent:'(of a substance) having or showing fluorescence',
    baccalaureate:'a college bachelor\'s degree',
    resuscitate:'revive (someone) from unconsciousness or apparent death',
    diptych:'a painting, especially an altarpiece, on two hinged wooden panels which may be closed like a book',
    calamitous:'involving calamity; catastrophic or disastrous',
    eulogize:'praise highly in speech or writing',
    onomatopeia:'the formation of a word from a sound associated with what is named (e.g. cuckoo, sizzle )',
    matinee:'a performance in a theater or a showing of a movie that takes place in the daytime',
    sleaze:'behave in an immoral, corrupt, or sordid way',
    insurmountable:'too great to be overcome',
    poignancy:'the quality of evoking a keen sense of sadness or regret',
    otorhinolaryngologist:'is a surgical subspecialty within medicine that deals with the surgical and medical management of conditions of the head and neck',
    scourge:'a whip used as an instrument of punishment',
    demagogue:'a political leader who seeks support by appealing to the desires and prejudices of ordinary people rather than by using rational argument',

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
const handleHardBtn = () => {
  wrapper.removeChild(difficulty)
  wrapper.append(main)
  diff = 'hard'
  runQuiz()
}

/**
 * Handling show hint
 */
const showHint = () => {
  isLookAtHint = true
  hintWrapper.removeChild(hintButton)
  switch(diff) {
    case 'hard': hint.innerHTML = `<b>Hint:</b> ${hardHints[currentQuestion]}`
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  scoreInfo.innerText = `Your Score: ${score}`
  switch(diff) {
    case 'hard': {
      currentQuestion = keys(hardQuestions)[question]
    }
  }
}

const random = () => {
  return Math.floor(Math.random() * keys(hardQuestions).length)
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
    case 'hard': {
      audio = new Audio(values(hardQuestions)[idx])
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

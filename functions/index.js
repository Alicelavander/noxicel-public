const functions = require("firebase-functions");
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const fireStore = admin.firestore()

async function checkGrammerWithGPT_3(text, prompt) {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIZATION_KEY
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${prompt}:${text}`,
    temperature: 0,
    max_tokens: 50,
  });
  return response;
}

exports.createUserProfile = functions.auth.user().onCreate((user) => {
  const usersRef = fireStore.collection('users');
  usersRef.doc(user.uid).create({});
})

exports.submit = functions.https.onCall(async (data, context) => {
  /*
  userId, courseId, wordsId, wordId.
  */
  const userId = context.auth.uid;
  const courseId = data.courseId;
  const wordsId = data.wordsId;
  const wordId = data.wordId;
  const submitText = data.submitText;

  if (!userId) throw new functions.https.HttpsError("unauthenticated", "You don't have a permission to do this function.")

  var res = '';
  await admin.firestore().doc(`noxicel/users/${userId}/submit/${courseId}/${wordsId}`).get()
    .then(async (docSnapshot) => {
      const grammerCorrectedTextRef = await checkGrammerWithGPT_3(submitText, "Correct ONLY the grammar");
      const grammarCorrectedText = grammerCorrectedTextRef["data"]["choices"][0]["text"];
      const targetWord = await admin.firestore().doc(`noxicel/courses/${courseId}/${wordsId}`).get()[wordId];

      var targetText = '';
      if(grammarCorrectedText.includes(targetWord)) {
        targetText = grammarCorrectedText;
      } else {
        targetText = submitText;
      }
      const usageRef = await checkGrammerWithGPT_3(targetText, "Is there an usage error?");
      const usageCheck = usageRef["data"]["choices"][0]["text"];
      if (usageCheck.includes('no') || usageCheck.includes('No')) {
        res = {feedback: "良い文章ですね！", usage: submitText};
      } else {
        const feedbackRef = await checkGrammerWithGPT_3(targetText, "Explain the usage error");
        const feedbackText = feedbackRef["data"]["choices"][0]["text"];
        res = {feedback: feedbackText, usage: grammarCorrectedText}; 
      }

      if (!docSnapshot.exists) {
        admin.firestore().doc(`noxicel/users/${userId}/submit/${courseId}/${wordsId}`).create({
          [wordId]: {
            text: submitText,
            feedback: res
          }
        });
      }
      else {
        admin.firestore().doc(`noxicel/users/${userId}/submit/${courseId}/${wordsId}`).update({
          [wordId]: {
            text: submitText,
            feedback: res
          }
        });
      }
    })
  return res;
})

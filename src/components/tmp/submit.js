import { doc, setDoc } from "firebase/firestore";
import { getApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

async function submit(linesArr) {
  const db = getFirestore(getApp());
  try {
    const totalCourse = linesArr.length / 6;
    for (let i = 0; i < totalCourse + 1; i++) {
      const docData = {
        1: {
          word: linesArr[6 * i][0],
          meaning: linesArr[6 * i][1].replace('\r', ''),
        },
        2: {
          word: linesArr[6 * i + 1][0],
          meaning: linesArr[6 * i + 1][1].replace('\r', ''),
        },
        3: {
          word: linesArr[6 * i + 2][0],
          meaning: linesArr[6 * i + 2][1].replace('\r', ''),
        },
        4: {
          word: linesArr[6 * i + 3][0],
          meaning: linesArr[6 * i + 3][1].replace('\r', ''),
        },
        5: {
          word: linesArr[6 * i + 4][0],
          meaning: linesArr[6 * i + 4][1].replace('\r', ''),
        },
        6: {
          word: linesArr[6 * i + 5][0],
          meaning: linesArr[6 * i + 5][1].replace('\r', ''),
        }
      }
      console.log(docData);

      const courseNum = i + 1;
      await setDoc(doc(db, "noxicel", "courses", "NAWL", courseNum.toString()), docData)

      console.log("Round" + i + " written!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default submit

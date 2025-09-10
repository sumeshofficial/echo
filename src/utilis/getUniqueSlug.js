import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const getUniqueSlug = async (baseSlug) => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const docRef = doc(db, "blogs", slug);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

export default getUniqueSlug;
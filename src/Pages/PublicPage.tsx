import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

interface ProfileData {
  name: string;
  photoURL: string;
}

function PublicPage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // const fetchProfile = async () => {
    //   const docRef = doc(db, "users", username);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setProfile(docSnap.data() as ProfileData);
    //   }
    // };

    // fetchProfile();
  }, [username]);

  return (
    <div>
      <h1>{profile ? profile.name : "Loading..."}</h1>
      {profile && (
        <div>
          <img src={profile.photoURL} alt={`${profile.name}'s profile`} />
          {/* Display other portfolio information */}
        </div>
      )}
    </div>
  );
}

export default PublicPage;
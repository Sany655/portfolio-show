import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileData {
  name: string;
  photoURL: string;
}

function OwnerPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [newData, setNewData] = useState<ProfileData>({name:"",photoURL:""});

  useEffect(() => {
    // const fetchProfile = async () => {
    //   const docRef = doc(db, 'users', auth.currentUser.uid);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setProfile(docSnap.data() as ProfileData);
    //   }
    // };

    // fetchProfile();
  }, []);

  const handleSave = async () => {
    // const docRef = doc(db, 'users', auth.currentUser.uid);
    // await setDoc(docRef, newData, { merge: true });
    // // Update state
    // setProfile({...profile,...newData });
  };

  const handleUpload = async (file: File) => {
    // const fileRef = ref(storage, `users/${auth.currentUser.uid}/${file.name}`);
    // await uploadBytes(fileRef, file);
    // const fileURL = await getDownloadURL(fileRef);
    // setNewData({...newData, photoURL: fileURL });
  };

  return (
    <div>
      <h1>Owner Page</h1>
      {profile && (
        <div>
          <input
            type="text"
            value={newData.name || profile.name || ''}
            onChange={(e) => setNewData({...newData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="file"
            onChange={(e) => {
                const files:FileList | null = e.target.files;
                if (files) {
                    handleUpload(files[0]);
                }
            }}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default OwnerPage;
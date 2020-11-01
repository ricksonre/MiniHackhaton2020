export default class handleImage
{



	constructor(firebase)
	{
		this.firebase = firebase;
	}

	uploadImage(image, fileName)
	{
		var storageRef = this.firebase.storage().ref();
		var fileRef = storageRef.child(fileName);
		fileRef.put(image).then(function(snapshot)
		{
			console.log('uploaded image', snapshot);
		})
	}
}
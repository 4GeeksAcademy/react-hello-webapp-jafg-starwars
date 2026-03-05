import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Single = () => {
	const { type, uid } = useParams();
	const [details, setDetails] = useState(null);

	useEffect(() => {
		fetch(`https://www.swapi.tech/api/${type}/${uid}`)
			.then(res => res.json())
			.then(data => setDetails(data.result.properties))
			.catch(err => console.error(err));
	}, [type, uid]);

    const imgType = type === "people" ? "characters" : type;
	const imgUrl = `https://starwars-visualguide.com/assets/img/${imgType}/${uid}.jpg`;

	return (
		<div className="container mt-5">
			{details ? (
				<>
					<div className="row mb-4">
						<div className="col-md-6 text-center">
							<img src={imgUrl} alt={details.name} className="img-fluid" onError={(e)=>{e.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}} />
						</div>
						<div className="col-md-6">
							<h1 className="text-center">{details.name}</h1>
							<p className="text-center mt-3">
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
							</p>
						</div>
					</div>
					<hr className="text-danger border-2 opacity-50" />
					<div className="row text-danger text-center mt-4">
                        
						{type === "people" && (
							<>
								<div className="col"><strong>Name</strong><br/>{details.name}</div>
								<div className="col"><strong>Birth Year</strong><br/>{details.birth_year}</div>
								<div className="col"><strong>Gender</strong><br/>{details.gender}</div>
								<div className="col"><strong>Height</strong><br/>{details.height}</div>
								<div className="col"><strong>Skin Color</strong><br/>{details.skin_color}</div>
								<div className="col"><strong>Eye Color</strong><br/>{details.eye_color}</div>
							</>
						)}
                        
					</div>
				</>
			) : (
				<div className="text-center">Loading...</div>
			)}
		</div>
	);
};
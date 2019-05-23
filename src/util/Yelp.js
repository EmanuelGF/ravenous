


const apiKey = 'xDWgyYFxKdrhcDg1YWbVwcE6wnhiXEizvecOCtoDCQ3sZ90Rwzs2_V2TmnvM27ExyxLBUbY15Gpq2Jfw5CZ3wxTU0f4Qu6apj4gABUccLmEnmFspClj6GSMupaDlXHYx';
const clientID = '7MX4HVghdZq5BtN0qJddCw';

const Yelp = {
    
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {Authorization: `Bearer ${apiKey}`}
        }  ).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Resquest failed!');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id : business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1 ,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                })
            }
        });
    }
};

export default Yelp;

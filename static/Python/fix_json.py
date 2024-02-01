import json

# open('listings.json', 'w').write(
#     json.dumps(json.load(open('static/data/listings_Kauai.json')), indent=4)
# )

open('listings_KP.json', 'w').write(
     json.dumps(json.load(open('static/data/listings_KP_Clean_R.json')), indent=4)
 )


[print(x) for x in json.load(open('static/data/listings_KP.json')).keys()]
"""
id
host_id
host_name
host_since
host_location
host_response_time
host_response_rate
host_acceptance_rate
host_is_superhost
host_neighbourhood
host_has_profile_pic
host_identity_verified
neighbourhood
neighbourhood_cleansed
neighbourhood_group_cleansed
latitude
longitude
property_type
room_type
accommodates
bathrooms_text
bedrooms
beds
price
minimum_nights
maximum_nights
minimum_minimum_nights
maximum_minimum_nights
minimum_maximum_nights
maximum_maximum_nights
minimum_nights_avg_ntm
maximum_nights_avg_ntm
calendar_updated
has_availability
availability_30
availability_60
availability_90
availability_365
calendar_last_scraped
number_of_reviews
number_of_reviews_ltm
number_of_reviews_l30d
first_review
last_review
review_scores_rating
instant_bookable
reviews_per_month
"""

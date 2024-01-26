CREATE TABLE "listings_KP_All_data_Clean" (
    "id" bigint   NOT NULL,
    "host_id" int   NOT NULL,
    "host_name" varchar (50)   NOT NULL,
	"host_identity_verified" varchar NOT NULL,
	"neighbourhood_cleansed" varchar NOT NULL,
	"neighbourhood_group_cleansed" varchar NOT NULL,
	"latitude" decimal NOT NULL,
	"longitude" decimal NOT NULL,
	"property_type" varchar NOT NULL,
	"room_type" varchar NOT NULL,
	"accommodates" int NOT NULL,
	"bathrooms_text" varchar NOT NULL,
	"beds" int NOT NULL,
	"price" decimal NOT NULL,
	"has_availability" varchar NOT NULL,
	"review_scores_rating" decimal NOT NULL,
	"instant_bookable" varchar NOT NULL,
	PRIMARY KEY (
        "id"
	)
);

DROP Table "listings_KP_All_data_Clean"

SELECT * From "listings_KP_All_data_Clean"
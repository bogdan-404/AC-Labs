CREATE TABLE user_registrations (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(320) NOT NULL,
    phone VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL
);

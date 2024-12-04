# Green Shadow Frontend

Green Shadow Frontend is a web-based user interface for managing agricultural equipment, fields, and staff. The frontend is built using HTML, CSS, and JavaScript (with the help of frameworks like Bootstrap and jQuery) to provide a responsive and user-friendly experience. It interacts with the Green Shadow backend via RESTful APIs to perform CRUD operations related to agricultural management.

## Features

### Equipment Management
- View and manage all available equipment.
- Assign equipment to staff and fields.
- Track equipment status and availability.

### Field Management
- View and manage fields, including their location, size, and associated equipment and staff.
- Add, update, or delete field details.

### Staff Management
- View and manage staff details, including name, role, and contact information.
- Assign staff to specific fields and equipment.

### User Interface
- Responsive design for different screen sizes.
- Easy-to-navigate forms for adding and updating staff, equipment, and field details.
- Modal windows for updating staff information.
- Select dropdowns for choosing equipment, staff, and fields.
  
### Authentication
- Secure login page with JWT authentication for backend access.
  
## Tech Stack

- **Frontend Framework:** Bootstrap for responsive design.
- **JavaScript:** jQuery for AJAX-based API calls and dynamic data handling.
- **API Integration:** RESTful APIs to interact with the backend for staff, equipment, and field management.
- **CSS:** Custom styles for enhanced UI.
  
## API Endpoints

### Authentication
- **POST /api/v1/auth/login**:  
  - Login endpoint to get a JWT token.
  - Request Body: `{ "username": "your-username", "password": "your-password" }`
  - Response: JWT token for authorized access.

### Staff Management
- **GET /api/v1/staff**:  
  - Fetch all staff members.
  
- **POST /api/v1/staff**:  
  - Add new staff member.
  - Request Body: `{ "staffCode": "SC001", "firstName": "John", "lastName": "Doe", "gender": "MALE", "role": "MANAGER", "contactNo": "123456789", "email": "john.doe@example.com" }`
  
- **PUT /api/v1/staff/{staffCode}**:  
  - Update staff information.
  - Request Body: `{ "firstName": "John", "lastName": "Doe", "contactNo": "987654321" }`
  
- **DELETE /api/v1/staff/{staffCode}**:  
  - Delete a staff member by staff code.

### Equipment Management
- **GET /api/v1/equipment**:  
  - Fetch all equipment.
  
- **POST /api/v1/equipment**:  
  - Add new equipment.
  - Request Body: `{ "name": "Tractor", "type": "Vehicle", "status": "Available" }`
  
- **PUT /api/v1/equipment/{equipmentId}**:  
  - Update equipment details.
  
- **DELETE /api/v1/equipment/{equipmentId}**:  
  - Delete equipment by ID.

### Field Management
- **GET /api/v1/field**:  
  - Fetch all fields.
  
- **POST /api/v1/field**:  
  - Add new field.
  - Request Body: `{ "fieldCode": "F001", "fieldName": "Farm A", "location": "North Zone", "size": "50 Acres" }`
  
- **PUT /api/v1/field/{fieldCode}**:  
  - Update field details.
  
- **DELETE /api/v1/field/{fieldCode}**:  
  - Delete a field by field code.

## Installation

To run the frontend locally, follow these steps:

### Prerequisites
- Web browser (Chrome, Firefox, etc.)
- Backend (Green Shadow backend) running locally or remotely.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/RandikaEdirisooriya/Green_Shadow_Frontend.git

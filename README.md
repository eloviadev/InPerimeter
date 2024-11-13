# InPerimeter: Custom Geofencing with Google Maps JavaScript API V3

## What is it?
**InPerimeter** is a flexible solution that allows you to determine if a location falls within a specified perimeter and customize the resulting output. It is extremely adaptable and highly customizable, making it suitable for various use cases tailored to individual needs.

## How does it work?
InPerimeter combines several features of the Google Maps JavaScript API V3 to implement custom geofencing:

1. **Defining the Perimeter**:
   - Using **Polygons**, a perimeter is created by specifying multiple coordinate points for precision.

2. **Input Conversion**:
   - The user’s input (e.g., an address or location in text form) is converted into latitude and longitude coordinates using the **Geocoder**.

3. **Geofencing Check**:
   - The location is checked against the defined perimeter using the **Geometry library** to determine if it is inside or outside the boundaries.

4. **Logic Execution**:
   - As these methods execute asynchronously, **JavaScript promises** are used to manage the flow, ensuring subsequent actions occur only after the asynchronous operations are completed.

5. **Customizable Output**:
   - The output of the geofencing check can be tailored according to specific needs, allowing results to trigger additional actions or be formatted for specific use cases.

6. **Extensibility**:
   - The geofencing logic itself can be extended to perform additional operations during the check, providing greater flexibility based on project requirements.

## Use Case Simulation
InPerimeter is presented with a use case simulation to demonstrate its functionality and flexibility. The solution is designed to be customized for each individual application, ensuring that it meets specific project needs.

## Project Structure
- **`index.html`**: Main HTML file with the user interface and Google Maps integration.
- **`callback.js`**: Handles Google Maps API callbacks.
- **`form.js`**: Manages animations and input validation for forms.
- **`inperimeter.js`**: Core geofencing logic.
- **`inperimeter.css`**: Styles for the application.
- **Other assets**: Includes icons and images (e.g., `favicon.ico`).

## License
This project is licensed under the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/). Any use, commercial or non-commercial, requires explicit written permission from the author. Contact [richard@elovia.it](mailto:richard@elovia.it) for inquiries.

## Author
Richard Sulollari - [richard@elovia.it](mailto:richard@elovia.it)

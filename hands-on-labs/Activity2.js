/**
 * This lab simulates testing API endpoints using promises.
 * We'll use setTimeout to simulate network requests.
 */

/**
 * Simulates an API call to fetch a user by ID
 * @param {number} userId - The user ID to fetch
 * @returns {Promise} Promise resolving to user data or rejecting with an error
 */
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate a 10% chance of network error
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
        return;
      }
      
      // Simulate user not found for certain IDs
      if (userId <= 0 || userId > 10) {
        reject(new Error('User not found'));
        return;
      }
      
      // Successful response
      resolve({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        isPremium: userId % 2 === 0 // Even IDs are premium users
      });
    }, 300);
  });
}

/**
 * Simulates an API call to fetch user orders
 * @param {number} userId - The user ID to fetch orders for
 * @returns {Promise} Promise resolving to an array of orders
 */
function fetchUserOrders(userId) {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate a 10% chance of network error
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
        return;
      }
      
      // Simulate no orders for certain users
      if (userId % 3 === 0) {
        resolve([]);
        return;
      }
      
      // Generate 1-3 random orders
      const orderCount = Math.floor(Math.random() * 3) + 1;
      const orders = [];
      
      for (let i = 0; i < orderCount; i++) {
        orders.push({
          id: `ORD-${userId}-${i + 1}`,
          date: new Date().toISOString(),
          amount: Math.floor(Math.random() * 100) + 10,
          status: Math.random() > 0.2 ? 'completed' : 'pending'
        });
      }
      
      resolve(orders);
    }, 300);
  });
}

/**
 * TODO: Implement this function to test the user API
 * It should fetch a user and then fetch their orders
 * @param {number} userId - The user ID to test
 * @returns {Promise} Promise resolving with test results
 */
function testUserAPI(userId) {
  return fetchUser(userId)
    return fetchUser(userId)
    .then(user => {
      return fetchUserOrders(userId).then(orders => {
        return {
          user,
          orders,
          isPremium: user.isPremium,
          hasOrders: orders.length>0
        };
      });
    });
  }

  // TODO: Implement the function
  // 1. Fetch the user by userId
  // 2. Then fetch the user's orders
  // 3. Return a promise that resolves with an object containing:
  //    - user: The user object
  //    - orders: The orders array
  //    - isPremium: Whether the user is a premium user
  //    - hasOrders: Whether the user has any orders
  // 4. If any step fails, the promise should reject with an error


/**
 * TODO: Implement this function to test multiple users simultaneously
 * @param {number[]} userIds - Array of user IDs to test
 * @returns {Promise} Promise resolving with all test results
 */
function testMultipleUsers(userIds) {
  const testPromises = userIds.map(id => testUserAPI(id));
  return Promise.allSettled(testPromises).then(results =>
    results.filter(r => r.status === "fulfilled")
    .map(r=> r.value)
  );
}
  // TODO: Implement the function
  // 1. Test all users in parallel using Promise.all
  // 2. Return a promise that resolves with an array of test results
  // 3. If any test fails, the promise should still resolve with results
  //    for the successful tests (Hint: use Promise.allSettled)


// Don't modify the code below this line
function runTests() {
  // Test a valid user
  testUserAPI(2)
    .then(result => {
      console.log('Single user test passed:', result);
    })
    .catch(error => {
      console.error('Single user test failed:', error.message);
    });
    
  // Test multiple users
  testMultipleUsers([1, 5, 10, 15])
    .then(results => {
      console.log('Multiple users test results:', results);
    });
}

runTests();
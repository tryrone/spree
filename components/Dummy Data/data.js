import img from '../../assets/spree/store/thanos.jpeg'
import img1 from '../../assets/spree/store/bag1.png'
import img2 from '../../assets/spree/store/bag2.png'
import img3 from '../../assets/spree/store/bag3.png'

  // Verification items data
export const verificationItems = [
    { 
      title: 'KYC Verification', 
      subtitle: 'Verify using any means of identification', 
      navigation: 'kycVerif1',
      isCompleted: true 
    },
    { 
      title: 'Email Verification', 
      subtitle: 'Complete your profile verification', 
      navigation: 'emailVerif1',
      isCompleted: false 
    },
    { 
      title: 'Phone number verification', 
      subtitle: 'Complete your Phone number verification', 
      navigation: 'phoneVerif1',
      isCompleted: false 
    },
    { 
      title: 'Avatar Upload', 
      subtitle: 'Complete your profile verification', 
      navigation: 'profileSetup',
      isCompleted: false 
    },
    { 
      title: 'Social Login', 
      subtitle: 'Integrate your social account', 
      navigation: 'socialVerif1',
      isCompleted: false 
    },
    { 
      title: 'Store-front setup', 
      subtitle: 'Set up store front', 
      navigation: 'storeSetup',
      isCompleted: false 
    }
  ];

  // Pending requests data
  export const pendingRequests = [
    {
      name: 'Josiah Doe',
      role: 'Buyer',
      amount: '120,000',
      date: 'Jan 28',
      time: '09:45',
      sentTo: false
    },
    {
      name: 'Josiah Doe',
      role: 'Seller',
      amount: '120,000',
      date: 'Jan 28',
      time: '09:45',
      sentTo: true
    },
    {
      name: 'Josiah Doe',
      role: 'Buyer',
      amount: '120,000',
      date: 'Jan 28',
      time: '09:45',
      sentTo: true
    }
  ];

  // Recent orders data
  export const recentOrders = [
    {
      name: 'Busola',
      items: 2,
      date: 'Today',
      product: 'Wireless microphone'
    },
    {
      name: 'Oghene',
      items: 1,
      date: 'Jan 12',
      product: 'Iphone 13 pro max'
    },
    {
      name: 'Busola',
      items: 2,
      date: 'Today',
      product: 'Wireless microphone'
    }
  ];

  // Nigerian Banks
  export const NIGERIAN_BANKS = [
    { id: '1', name: 'A&M thrift store', code: '044' },
    { id: '2', name: 'Access Bank', code: '044' },
    { id: '3', name: 'Citibank Nigeria', code: '023' },
    { id: '4', name: 'Ecobank Nigeria', code: '050' },
    { id: '5', name: 'Fidelity Bank', code: '070' },
    { id: '6', name: 'First Bank of Nigeria', code: '011' },
    { id: '7', name: 'First City Monument Bank', code: '214' },
    { id: '8', name: 'Guaranty Trust Bank', code: '058' },
    { id: '9', name: 'Heritage Bank', code: '030' },
    { id: '10', name: 'Keystone Bank', code: '082' },
    { id: '11', name: 'Polaris Bank', code: '076' },
    { id: '12', name: 'Stanbic IBTC Bank', code: '221' },
    { id: '13', name: 'Standard Chartered Bank', code: '068' },
    { id: '14', name: 'Sterling Bank', code: '232' },
    { id: '15', name: 'Union Bank of Nigeria', code: '032' },
    { id: '16', name: 'United Bank for Africa', code: '033' },
    { id: '17', name: 'Unity Bank', code: '215' },
    { id: '18', name: 'Wema Bank', code: '035' },
    { id: '19', name: 'Zenith Bank', code: '057' },
  ];

  // transactins data
  export const transactionData = [
    {
      title: 'Today',
      data: [
        {
          name: 'Josiah Doe',
          role: 'Buyer',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'Initiated',
        },
        {
          name: 'Jane Dane',
          role: 'Seller',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'Paid',
        },
        {
          name: 'Josiah Doe',
          role: 'Buyer',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'Closed',
        },
      ],
    },
    {
      title: 'Yesterday',
      data: [
        {
          name: 'Josiah Doe',
          role: 'Buyer',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'Settled',
        },
        {
          name: 'Jane Dane',
          role: 'Seller',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'Initiated',
        },
        {
          name: 'Josiah Doe',
          role: 'Seller',
          description: 'Apple vision pro. Black..',
          amount: '₦500,000',
          status: 'In dispute',
        },
      ],
    },
  ];

  export const transactionDetails = [
    {
      "header": {
        "status": "Waiting for payment..",
        "messageButtonText": "Message Buyer"
      },
      "amount": {
        "value": "₦120,000",
        "initiatedBy": "buyer"
      },
      "buyerDetails": {
        "name": "Fortunate Chuwks",
        "number": "09052810663"
      },
      "timeline": [
        {
          "label": "Closed (in favor of the buyer)",
          "date": "24th December, 2023"
        },
        {
          "label": "Dispute raised",
          "date": "24th December, 2023"
        },
        {
          "label": "Received",
          "date": "24th December, 2023"
        },
        {
          "label": "Paid",
          "date": "24th December, 2023"
        },
        {
          "label": "Initiated",
          "date": "24th December, 2023"
        },
        {
          "label": "Delivery date",
          "date": "29th December, 2023"
        }
      ],
      "dates": [
        {
          "label": "Delivery date",
          "value": "29th December, 2023"
        },
        {
          "label": "Inspection date (3 days from delivery)",
          "value": "1st January, 2024"
        }
      ],
      "note": "NB: Complaints must be raised before the inspection period ends, or the transaction is considered complete",
      "productDetails": {
        "name": "Clothing, shoe",
        "quality": "2 qualities",
        "condition": "Perfect",
        "images": ["cloth", "cloth", "cloth", "cloth"]
      }
    }
  ];

  export const messageData =  [
    {
      image: img,
      store: "A&M thrift",
      message: "Thank you",
      date: "15:41 PM",
      status: "read"
    },
    {
      image: img,
      store: "A&M thrift",
      message: "Thank you",
      date: "15:41 PM",
      status: "unread"
    },
    {
      image: img,
      store: "A&M thrift",
      message: "Thank you",
      date: "15:41 PM",
      status: "read"
    },
    {
      image: img,
      store: "A&M thrift",
      message: "Thank you",
      date: "15:41 PM",
      status: "unread"
    }
  ]

  export const productsGoods =  [
    {
      id: 1,
      name: 'Fresh Thanos shades',
      price: '$1,200',
      category: 'Electronics',
      image: img,
      store: 'Marvel Studio',
      about: "You Could Not Live With Your Own Failure, And Where Did That Bring You? Back To Me."
    },
    {
      id: 2,
      name: 'Captain Fucking America',
      price: '$85',
      category: 'Dresses',
      image: img1,
      store: 'Marvel Studio',
      about: "The Price Of Freedom Is High. It Always Has Been. And It's A Price I'm Willing To Pay."
    },
    {
      id: 3,
      name: 'Superman Leather Jacket',
      price: '$250',
      category: 'Jackets',
      image: img2,
      store: 'DC Studios',
      about: "I Believe In Second Chances, I Believe In Redemption, But, Mostly, I Believe In My Friends."
    },
    {
      id: 4,
      name: 'The Dark Knight',
      price: '$65',
      category: 'Pants',
      image: img3,
      store: 'DC Studios',
      about: "The voice kept calling me Bruce. In my mind, that's not what I call myself."
    }
  ]

  export const category = [
    {
      id: 1,
      image: img,
      title: "Women's clothings"
    },
    {
      id: 2,
      image: img1,
      title: "Men's clothings"
    },
    {
      id: 3,
      image: img2,
      title: "Accessories"
    },
    {
      id: 4,
      image: img3,
      title: "Shoes"
    },
    {
      id: 5,
      image: img,
      title: "Electronics"
    },
    {
      id: 6,
      image: img1,
      title: "Beauty"
    },
    {
      id: 7,
      image: img2,
      title: "Sports and Outdoors"
    },
    {
      id: 8,
      image: img3,
      title: "Health and Wellness"
    },
    {
      id: 9,
      image: img,
      title: "Toys and Games"
    },
    {
      id: 10,
      image: img1,
      title: "Baby and Kids"
    },
  ]

  export const subCategoryProducts = [
    {
      id: 1,
      name: "Checkered shirt",
      price: "₦150,000",
      rating: 4.0,
      image: require('../../assets/spree/store/lex.jpg'),
      category: "Shirts",
      description: "Red stripes and something"
    },
    {
      id: 2,
      name: "Beige pants",
      price: "₦150,000",
      rating: 4.0,
      image: require('../../assets/spree/store/metamopho.jpg'),
      category: "Pants",
      description: "Comfortable beige trousers"
    },
    {
      id: 3,
      name: "White wedding gown",
      price: "₦150,000",
      rating: 4.0,
      image: require('../../assets/spree/store/mrt.jpg'), 
      category: "Dresses",
      description: "Elegant white wedding dress"
    },
    {
      id: 4,
      name: "White wedding gown",
      price: "₦150,000",
      rating: 1000,
      image: require('../../assets/spree/store/thanos.jpeg'), 
      category: "Dresses",
      description: "Beautiful white wedding gown"
    },
    {
      id: 5,
      name: "Checkered shirt",
      price: "₦150,000",
      rating: 4.0,
      image: require('../../assets/spree/store/sups.jpeg'), 
      category: "Shirts",
      description: "Stylish checkered pattern shirt"
    },
    {
      id: 6,
      name: "Checkered shirt",
      price: "₦150,000",
      rating: 4.0,
      image: require('../../assets/spree/store/metamopho.jpg'), 
      category: "Shirts",
      description: "Classic checkered design"
    }
  ];
  
  export const productData = {
    id: 1,
    name: 'Brown Leather Hand Bag',
    price: '₦ 20,000',
    rating: 4.85,
    reviews: 10,
    likes: 200,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    store: 'A&M Thrift Store',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Alli non vulputate libero et velit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#000000', '#fff', '#D2691E', '#F4A460', '#32CD32'],
  };

  export const cart = [
      {
        id: 1,
        name: 'BROWN LEATHER HAND BAG',
        description: 'Small, white',
        price: 20000,
        quantity: 1,
        store: 'A&M Thrift Store',
        image: img1
      },
      {
        id: 2,
        name: 'BROWN LEATHER HAND BAG',
        description: 'Small, white',
        price: 20000,
        quantity: 1,
        store: 'A&M Thrift Store',
        image: img1
      },
      {
        id: 3,
        name: 'BROWN LEATHER HAND BAG',
        description: 'Small, white',
        price: 20000,
        quantity: 1,
        store: 'A&M Thrift Store',
        image: img1
      }
    ]
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import { fetchAllPosts, postPropType } from "../components/PostUtils";
import {
  Search,
  RefreshCw,
  MapPin,
  DollarSign,
  Clock,
  CalendarDays,
  Pencil,
  BookOpen,
  Users,
  X,
} from "lucide-react";

// Subcomponent for filter inputs
const FilterInputs = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = (key) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  const filterFields = [
    {
      key: "search",
      placeholder: "Search for tuition title...",
      icon: <Search className="w-5 h-5 text-gray-400" />,
      type: "text",
    },
    {
      key: "salary",
      placeholder: "Minimum Salary",
      icon: <DollarSign className="w-5 h-5 text-gray-400" />,
      type: "text",
    },
    {
      key: "experience",
      placeholder: "Experience (years)",
      icon: <Clock className="w-5 h-5 text-gray-400" />,
      type: "number",
    },
    {
      key: "location",
      placeholder: "Location",
      icon: <MapPin className="w-5 h-5 text-gray-400" />,
      type: "text",
    },
    {
      key: "subject",
      placeholder: "Subject",
      icon: <Pencil className="w-5 h-5 text-gray-400" />,
      type: "text",
    },
    {
      key: "classType",
      placeholder: "Class Type (1/2/O/A)",
      icon: <CalendarDays className="w-5 h-5 text-gray-400" />,
      type: "text",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filterFields.map(({ key, placeholder, icon, type }) => (
        <div key={key} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</div>
          <input
            type={type}
            placeholder={placeholder}
            value={filters[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          {filters[key] && (
            <button
              onClick={() => handleClear(key)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      ))}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <BookOpen className="w-5 h-5 text-gray-400" />
        </div>
        <select
          value={filters.medium}
          onChange={(e) => handleChange("medium", e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        >
          <option value="">Select Medium</option>
          <option value="BANGLA">Bangla</option>
          <option value="ENGLISH">English</option>
        </select>
        {filters.medium && (
          <button
            onClick={() => handleClear("medium")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        <select
          value={filters.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        >
          <option value="">Select Gender Preference</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHERS">Others</option>
        </select>
        {filters.gender && (
          <button
            onClick={() => handleClear("gender")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

FilterInputs.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    experience: PropTypes.string,
    medium: PropTypes.string,
    subject: PropTypes.string,
    classType: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    salary: "",
    location: "",
    experience: "",
    medium: "",
    subject: "",
    classType: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.userId) {
      const loadPosts = async () => {
        setLoading(true);
        const posts = await fetchAllPosts();
        setAllPosts(posts);
        setFilteredPosts(posts);
        setLoading(false);
      };
      loadPosts();
    }
  }, [user]);

  const filterBySearch = (posts, search) => {
    if (!search.trim()) return posts;
    const searchLower = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.name?.toLowerCase().includes(searchLower) ||
        post.userId?.name?.toLowerCase().includes(searchLower)
    );
  };

  const filterBySalary = (posts, salary) => {
    if (!salary.trim()) return posts;
    const salaryValue = parseFloat(salary);
    if (isNaN(salaryValue)) return posts;
    return posts.filter((post) => post.salary && parseFloat(post.salary) >= salaryValue);
  };

  const filterByLocation = (posts, location) => {
    if (!location.trim()) return posts;
    const locationLower = location.toLowerCase();
    return posts.filter((post) => post.location?.toLowerCase().includes(locationLower));
  };

  const filterByExperience = (posts, experience) => {
    if (!experience.trim()) return posts;
    const expValue = parseFloat(experience);
    if (isNaN(expValue)) return posts;
    return posts.filter((post) => post.experience && parseFloat(post.experience) <= expValue);
  };

  const filterByMedium = (posts, medium) => {
    if (!medium.trim()) return posts;
    const mediumUpper = medium.toUpperCase();
    return posts.filter((post) => post.medium === mediumUpper);
  };

  const filterBySubject = (posts, subject) => {
    if (!subject.trim()) return posts;
    const subjectLower = subject.toLowerCase();
    return posts.filter((post) =>
      post.subject?.some((sub) => sub.name?.toLowerCase().includes(subjectLower))
    );
  };

  const filterByClassType = (posts, classType) => {
    if (!classType.trim()) return posts;
    const classTypeLower = classType.toLowerCase();
    return posts.filter((post) => post.classtype?.toLowerCase().includes(classTypeLower));
  };

  const filterByGender = (posts, gender) => {
    if (!gender.trim()) return posts;
    const genderUpper = gender.toUpperCase();
    return posts.filter((post) => post.gender === genderUpper);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allPosts];
      filtered = filterBySearch(filtered, filters.search);
      filtered = filterBySalary(filtered, filters.salary);
      filtered = filterByLocation(filtered, filters.location);
      filtered = filterByExperience(filtered, filters.experience);
      filtered = filterByMedium(filtered, filters.medium);
      filtered = filterBySubject(filtered, filters.subject);
      filtered = filterByClassType(filtered, filters.classType);
      filtered = filterByGender(filtered, filters.gender);
      setFilteredPosts(filtered);
    };

    applyFilters();
  }, [filters, allPosts]);

  const resetFilters = () => {
    setFilters({
      search: "",
      salary: "",
      location: "",
      experience: "",
      medium: "",
      subject: "",
      classType: "",
      gender: "",
    });
    setFilteredPosts(allPosts);
  };

  return (
    <div className="min-h-screen" style={{ background: 'white' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mt-16">
        <div className="bg-gradient-to-r from-[#A6D8FF] to-[#3F7CAD] text-white p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-wide">Tuition Posts</h1>
            {user && (
              <button
                className="bg-white text-blue-600 rounded-full px-6 py-3 shadow-md transition-all hover:bg-gray-100"
                onClick={() => navigate("/create-post")}
              >
                Create New Post
              </button>
            )}
            <button
              onClick={resetFilters}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300"
            >
              <RefreshCw className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <FilterInputs filters={filters} setFilters={setFilters} />
        </div>
        <div className="p-6 pt-0">
          <h2 className="text-2xl font-semibold mb-4">
            {loading ? "Loading tuition posts..." : "Latest Tuition Posts"}
          </h2>
          <PostList loading={loading} posts={filteredPosts} resetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(postPropType),
};

export default Posts;
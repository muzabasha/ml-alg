"""
Test script to verify backend API functionality
Run this after starting the backend server
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health check endpoint"""
    print("\n🔍 Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 200
    print("✅ Health check passed!")

def test_list_algorithms():
    """Test listing all algorithms"""
    print("\n🔍 Testing algorithm list...")
    response = requests.get(f"{BASE_URL}/api/algorithms/list")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {data['count']} algorithms:")
    for algo in data['algorithms']:
        print(f"  - {algo['name']} ({algo['category']})")
    assert response.status_code == 200
    assert data['count'] > 0
    print("✅ Algorithm list passed!")

def test_get_algorithm():
    """Test getting specific algorithm"""
    print("\n🔍 Testing get algorithm (linear_regression)...")
    response = requests.get(f"{BASE_URL}/api/algorithms/linear_regression")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Algorithm: {data['name']}")
    print(f"Sections: {list(data['sections'].keys())}")
    assert response.status_code == 200
    assert 'sections' in data
    print("✅ Get algorithm passed!")

def test_get_section():
    """Test getting specific section"""
    print("\n🔍 Testing get section (introduction)...")
    response = requests.get(f"{BASE_URL}/api/algorithms/linear_regression/section/introduction")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Section: {data['section_name']}")
    print(f"Content keys: {list(data['content'].keys())}")
    assert response.status_code == 200
    print("✅ Get section passed!")

def test_code_execution():
    """Test code execution"""
    print("\n🔍 Testing code execution...")
    code = """
import numpy as np
x = np.array([1, 2, 3, 4, 5])
print(f"Mean: {x.mean()}")
print(f"Std: {x.std()}")
"""
    response = requests.post(
        f"{BASE_URL}/api/execute/run",
        json={"code": code}
    )
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Success: {data['success']}")
    print(f"Output:\n{data['output']}")
    if data['error']:
        print(f"Error: {data['error']}")
    assert response.status_code == 200
    assert data['success'] == True
    print("✅ Code execution passed!")

def test_regression_evaluation():
    """Test regression model evaluation"""
    print("\n🔍 Testing regression evaluation...")
    response = requests.post(
        f"{BASE_URL}/api/execute/evaluate",
        json={
            "y_true": [1.0, 2.0, 3.0, 4.0, 5.0],
            "y_pred": [1.1, 2.2, 2.9, 4.1, 5.2],
            "task_type": "regression"
        }
    )
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Task type: {data['task_type']}")
    print(f"Metrics:")
    for metric, value in data['metrics'].items():
        print(f"  {metric}: {value}")
    assert response.status_code == 200
    assert 'MSE' in data['metrics']
    print("✅ Regression evaluation passed!")

def test_classification_evaluation():
    """Test classification model evaluation"""
    print("\n🔍 Testing classification evaluation...")
    response = requests.post(
        f"{BASE_URL}/api/execute/evaluate",
        json={
            "y_true": [0, 1, 1, 0, 1, 0],
            "y_pred": [0, 1, 0, 0, 1, 1],
            "task_type": "classification"
        }
    )
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Task type: {data['task_type']}")
    print(f"Metrics:")
    for metric, value in data['metrics'].items():
        if metric != 'Confusion Matrix':
            print(f"  {metric}: {value}")
    print(f"  Confusion Matrix:\n{data['metrics']['Confusion Matrix']}")
    assert response.status_code == 200
    assert 'Accuracy' in data['metrics']
    print("✅ Classification evaluation passed!")

def test_categories():
    """Test getting algorithm categories"""
    print("\n🔍 Testing algorithm categories...")
    response = requests.get(f"{BASE_URL}/api/algorithms/categories/list")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Categories:")
    for cat in data['categories']:
        print(f"  {cat['name']}: {cat['count']} algorithms")
    assert response.status_code == 200
    print("✅ Categories test passed!")

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("🚀 Starting API Tests")
    print("=" * 60)
    
    try:
        test_health()
        test_list_algorithms()
        test_get_algorithm()
        test_get_section()
        test_code_execution()
        test_regression_evaluation()
        test_classification_evaluation()
        test_categories()
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS PASSED!")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to backend server")
        print("Make sure the backend is running on http://localhost:8000")
        print("Run: python app/main.py")
        
    except AssertionError as e:
        print(f"\n❌ TEST FAILED: {e}")
        
    except Exception as e:
        print(f"\n❌ UNEXPECTED ERROR: {e}")

if __name__ == "__main__":
    run_all_tests()

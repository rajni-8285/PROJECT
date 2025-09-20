from flask import Flask, render_template, request, redirect,url_for, jsonify
from flask_mysqldb import MySQL
import google.generativeai as genai
import os

app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'menstrual_health'

mysql = MySQL(app)



genai.configure(api_key="AIzaSyCjHVYfvIG8Yx8e14fkfzgbBti-cCSyUZk")

@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/home')
def home():
    return render_template("home.html")


@app.route('/next')
def next():
    return render_template("next.html")

@app.route('/signup')
def signup():
    return render_template("signup.html")

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        city = request.form['city']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (name, email, password, city) VALUES (%s, %s, %s, %s)", (name, email, password, city))
        mysql.connection.commit()
        cur.close()
        
       
        return redirect(url_for("next"))  

    return render_template("signin.html")  


@app.route('/care')
def care():
    return render_template("care.html")

@app.route('/images')
def images():
    return render_template("images.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route("/api/suggestions")
def get_suggestions():
    query = request.args.get("q", "").lower()
    all_queries = [
"solution for period pain in 7 words.",
"Period pain ke liye gharelu upay",
"my period stays only 3 days is it ok",
"Irregular periods ke causes",
"Periods late ho to kya karein",
"Periods kaise regular karein naturally",
"Period ke time kya khana chahiye",
"Normal period ki duration kitni hoti hai",
"Home remedies for menstrual cramps",
"White discharge ke gharelu upay",
"Mood swings during period",
"Period ke dauran exercise karna",
"Home remedies for severe period cramps?",
"Natural ways to reduce menstrual pain instantly?",
"How to relieve lower back pain during periods at home?",
"What to drink during periods to ease pain?",
"Home remedy for bloating during menstruation?",
"How to stop nausea during periods using home treatment?",
"Best foods to eat during periods to reduce discomfort?",
"Herbal teas that help with period cramps?",
"Home remedy to reduce excessive bleeding during periods?",
"Natural ways to get rid of period headaches?",
"How to ease breast tenderness during menstruation naturally?",
"What to do at home for mood swings during periods?",
"Home remedy for fatigue during menstruation?",
"How to sleep better during periods naturally?",
"Warm compress or cold compress for period cramps?",
"Natural oils for abdominal pain during menstruation?",
"Home yoga poses to relieve menstrual pain?",
"Foods to avoid during periods for less pain?",
"Best natural drinks for menstrual health?",
"Ayurvedic remedies for irregular periods?",
"Home remedies to get periods early or on time?",
"What to eat to delay periods naturally?",
"Remedies for dizziness during periods?",
"How to stay active during periods without pain?",
"Herbal remedies for light period flow?",
"Tips to relieve pelvic pressure during menstruation?",
"How to reduce acne during periods at home?",
"Home cure for constipation during menstruation?",
"What natural herbs balance hormones during periods?",
"Best home remedy for painful ovulation cramps?",
"How to manage diarrhea during periods naturally?",
"Natural remedy for heavy clotting in periods?",
"Is cinnamon good for period cramps?",
"Can ginger reduce menstrual pain?",
"Is ajwain water helpful during menstruation?",
"How to reduce leg pain during periods naturally?",
"Simple home massage techniques for period relief?",
"Natural way to boost energy during menstruation?",
"Home remedy to reduce irritability during periods?",
"Is turmeric milk helpful in menstrual cramps?",
"Can fenugreek seeds help in period pain?",
"Home tips for reducing period-related anxiety?",
"What to apply on stomach for period cramp relief?",
"Homemade herbal remedy for period regulation?",
"Remedies for sore thighs during menstruation?",
"Can apple cider vinegar help with periods?",
"Is aloe vera helpful during menstruation?",
"Natural ways to fight infection risk during periods?",
"Can banana reduce cramps during periods?",
"Bedtime home remedies for peaceful sleep during periods?"
    ]
    filtered = [q for q in all_queries if query in q.lower()]
    return jsonify(filtered)

@app.route('/search')
def search():
    keyword = request.args.get('keyword', '')
    return render_template("result.html", keyword=keyword)

@app.route('/api/fetch_data', methods=['GET'])
def fetch_data():
    keyword = request.args.get('keyword', '')

    try:
         # Avoid irrelevant keywords
        irrelevant = ["car", "bike", "train", "truck", "goda", "gadi", "vehicle", "bus"]
        if any(word in keyword.lower() for word in irrelevant):
            return jsonify({"response": "Sorry, I can only provide information related to menstrual or health-related topics."})

        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(f"Give some health-related information about: {keyword}")
        print( response.text)
        return jsonify({"response": response.text})
    except Exception as e:
        import traceback  
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
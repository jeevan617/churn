from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('helvetica', 'B', 15)
        self.cell(0, 10, 'CHURN.AI Workflow & Parameters Documentation', border=1, align='C', new_x="LMARGIN", new_y="NEXT")
        self.ln(10)

    def chapter_title(self, title):
        self.set_font('helvetica', 'B', 12)
        self.set_fill_color(200, 220, 255)
        self.cell(0, 10, title, border=1, align='L', fill=True, new_x="LMARGIN", new_y="NEXT")
        self.ln(4)

    def chapter_body(self, body):
        self.set_font('helvetica', '', 11)
        self.multi_cell(0, 8, body, border=1)
        self.ln(10)

pdf = PDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)

# Workflow 1
title1 = "1. AI Prediction API Workflow"
body1 = """The primary workflow is the predictive API that calculates the risk of churn using logistic regression models for 5 business domains: Telecom, E-Commerce, Banking, SaaS, and Gaming.
When a user accesses the platform, they utilize this workflow to get instantaneous churn risk scores.

Process Flow:
1. User Logs In.
2. Selects Domain (e.g., SaaS, Telecom).
3. Enters Parameters (up to 13 parameters depending on domains like tenure, TotalCharges, npsScore, etc.).
4. The React Client posts to `/api/predict`.
5. The API scores using a Logistic Regression formula: 
   P(churn) = sigmoid(b0 + b1x1 + ... + bnxn)
6. Output: Score (0-100), Risk Tier (LOW, MODERATE, HIGH, CRITICAL), and factor explainability breakdown.

Example Parameters (SaaS domain):
- subscriptionAge, planTier, monthlyActiveDays, featuresUsedPct, teamSize, lastLoginDaysAgo, apiCallsMonthly, supportTickets, npsScore, hasIntegrations, hasSso, hasDedicatedCsm."""
pdf.chapter_title(title1)
pdf.chapter_body(body1)

# Workflow 2
title2 = "2. ML Model Training Pipeline Workflow"
body2 = """The secondary workflow is the internal ML engine for regenerating churn models, implemented in `ml_engine/train_xgboost_churn.py`.

Process Flow:
1. Data Ingestion: Connects to the data warehouse and extracts user features (e.g., tenure, monthly_charges, total_charges, support_tickets_6mo, nps_score, active_days_last_month, usage_drop_pct).
2. Label Generation: Uses simulated churn logic based on usage drops and NPS.
3. Data Splitting: Splits into 80% training data and 20% test data.
4. Normalization: Uses StandardScaler to scale continuous features.
5. Hyperparameter Definition & Optimization: Initialize XGBoost.
6. Execution: GPU cluster convergence training.
7. Evaluation metrics generated: Accuracy, Precision, Recall, F1-Score.
8. Artifact Export: Saves the trained model as 'xgboost_churn_v2.pkl'.

Key Hyperparameters for XGBClassifier:
- n_estimators = 200
- learning_rate = 0.05
- max_depth = 6
- subsample = 0.8
- colsample_bytree = 0.8
- eval_metric = logloss

These two workflows represent the entire lifecycle of the Churn.AI platform, balancing realtime logistical regression models with heavier off-line XGBoost models."""
pdf.chapter_title(title2)
pdf.chapter_body(body2)

pdf.output("workflows_and_parameters.pdf")

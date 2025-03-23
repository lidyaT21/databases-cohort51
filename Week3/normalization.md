Database Normalization Analysis

## Was Your Database Already in 2NF / 3NF?

### **First Normal Form (1NF)**

The ERD for the recipe database satisfies **1NF** because:

- **Atomic Values**: Each column in the tables holds atomic values (indivisible values).
- **Unique Column Names**: Each column in a table has a unique name.
- **No Repeating Groups**: Each table organizes data into rows and columns without duplicate groupings.
- **Primary Keys**: Each table has a primary key to ensure unique identification of rows.

### **Second Normal Form (2NF)**

The ERD satisfies **2NF** because:

- **It satisfies 1NF.**
- **No Partial Dependencies**: Non-key attributes are functionally dependent on the entire primary key.
- **Tables with Only One Non-PK**: These attributes are fully dependent on the primary key, ensuring compliance with 2NF.

### **Third Normal Form (3NF)**

The ERD satisfies **3NF** because:

- **It satisfies 2NF.**
- **No Transitive Dependencies**: All non-key attributes are directly dependent on the primary key.
- **Foreign Keys Don't Introduce Transitive Dependencies**: Relationships between tables are structured properly.
- **Some tables contain only one non-PK column**, which does not introduce transitive dependencies.

---

## **Challenges When Adding Thousands of Recipes**

### **1. Storage**

### **2. Performance**

### **3. Data Integrity**

### **4. Indexing and Query Performance**

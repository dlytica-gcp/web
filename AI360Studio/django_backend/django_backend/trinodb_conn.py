from trino.dbapi import connect


class TrinoDbConnection:
    def __init__(self) -> None:
        conn = connect(
            # host="dlytica-kube-vm.eastus.cloudapp.azure.com",
            # port=32553,
            # user="admin",
            # catalog="iceberg",
            # http_scheme='http',
            host="10.10.157.105",
            port=30649,
            user="dlyticauser",
            catalog="iceberg",
            http_scheme='http',
        )
        self.connection = conn

    def execute_query(self, query, params=None):
        cursor = self.connection.cursor()
        try:
            cursor.execute(query, params)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
        finally:
            cursor.close()
        return rows, column_names

    def close(self):
        self.connection.close()
